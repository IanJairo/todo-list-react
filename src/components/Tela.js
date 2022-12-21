import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text, View,
  TouchableOpacity,
  TextInput, FlatList,
  SafeAreaView
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import TaskList from './TaskList';
import ProgressLoader from 'rn-progress-loader';

class Tela extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      task: [],
      input: '',
      select: 9,
      loading: true
    });
  }

  /* EXECUTA QUANDO ENTRA */
  componentDidMount() {
    var newThis = this;
    newThis.listToDo()
  }

  listToDo = async () => {
    {/* REQUISIÇÃO PARA ADICIONAR UMA ATIVIDADE */ }
    await fetch('https://www.todo.site.com/listarAtividades.php', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: 39158 })
    })
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          task: res,
          loading: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleAdd = () => {
    if (this.state.input == '') return alert('Preencha o campo');
    if (this.state.select == 9) return alert('Selecione a prioridade');

    this.setState({ loading: true });

    {/* REQUISIÇÃO PARA APAGAR UMA ATIVIDADE */ }
    fetch('https://www.todo.site.com/cadastrarAtividade.php', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item: this.state.input,
        priority: this.state.select
      }),
    }).then((response) => response.json())
      .then((res) => {
        if (res == 1) {
          this.setState({
            input: '',
            loading: true
          });
          this.listToDo();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleDelete = (item) => {

    this.setState({ loading: true });

    fetch('https://www.todo.site.com/excluirAtividade.php', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: 39158,
        id: item.id
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res == 1) {
          this.setState({
            loading: true
          })
          this.listToDo();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container} >
        <StatusBar style="dark" />
        {/* Header*/}
        <View style={styles.content}>
          <Text style={styles.title}>TODO</Text>
          <Text style={styles.title1}>LIST</Text>
        </View>

        {/* LOADER */}
        <View>
          <ProgressLoader
            visible={this.state.loading}
            isModal={true} isHUD={true}
            hudColor={"#8DC34A"}
            color={"#000000"} />
        </View>

        {/* CAIXA DE TEXTO*/}
        <View style={styles.new_text}>
          <TextInput
            multiline={true}
            placeholder="Nova Tarefa"
            autoCorrect={false}
            style={styles.input}
            value={this.state.input}
            onChangeText={(texto) => this.setState({ input: texto })} />

          {/* BOTÃO DE ADICIONAR */}
          <TouchableOpacity
            style={styles.add}
            onPress={this.handleAdd}>

            {/* ICONE DO BOTÃO */}
            <AntDesign style={{
              marginLeft: 5,
              marginRight: 10,
              marginTop: 37,
            }} name="pluscircleo" size={24} color="#42a5f5" />
          </TouchableOpacity>
        </View>

        {/* SELECIONA A PRIORIDADE*/}
        <View style={styles.selector}>
          <Text style={styles.labelSelect}>Selecione a prioridade</Text>
          <RNPickerSelect
            placeholder={{
              label: 'Selecionar...',
              value: null,
            }}
            onValueChange={(value) => this.setState({ select: value })}
            items={[
              { label: 'Low', value: 0 },
              { label: 'Medium', value: 1 },
              { label: 'High', value: 2 },
            ]}
          />
        </View>

        {/* LISTAGEM DAS ATIVIDADES*/}
        <View style={styles.lista}>
          <FlatList
            showsVerticalScrollIndicator={true}
            data={this.state.task}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <TaskList data={item} handleDelete={this.handleDelete} />}
          />
        </View>
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },

  title: {
    marginTop: 5,
    paddingTop: 25,
    paddingBottom: 15,
    fontSize: 15,
    textAlign: 'center',
    color: '#FFF',
  },

  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#8DC34A',
  },

  title1: {
    paddingLeft: 5,
    marginTop: 5,
    paddingTop: 25,
    fontSize: 15,
    textAlign: 'center',
    color: '#FFF',
    fontWeight: "bold"
  },

  lista: {
    flexDirection: 'column',
    flex: 3

  },

  labelSelect: {
    marginBottom: 10,
    color: '#474a51',
    fontSize: 10
  },

  selector: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  new_text: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  input: {
    flex: 1,
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    padding: 9,
    height: 40,
    textAlignVertical: 'top',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },

  colorLabel: {
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default Tela;
