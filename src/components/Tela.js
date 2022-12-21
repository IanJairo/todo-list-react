import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, SafeAreaView
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import TaskList from './TaskList';
import ProgressLoader from 'rn-progress-loader';
import { database } from './../../config/FirebaseConfig';

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

  componentDidMount() {
    {/* EXECUTA QUANDO ENTRA */ }
    var newThis = this;
    newThis.listToDo()
  }

  // Lista os items 
  listToDo = async () => {
    this.setState({
      task: [],
      loading: true
    });
    // Recebe os items do Firebase 
    await database.firestore().collection('atividades').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          // Cria um objeto para cada item
          const res = {
            id: doc.id,
            item: doc.data().item,
            priority: doc.data().priority
          }
          // Adiciona lista todo          
          this.setState({
            task: [res, ...this.state.task],
          });
        });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
    // Para o loading
    this.setState({ loading: false });
  }

  // Adiciona um item na lista de todo
  handleAdd = async () => {
    // Alertas para campos vazios
    if (this.state.input == '') return alert('Preencha o campo');
    if (this.state.select == 9) return alert('Selecione a prioridade');

    // Inicia o loading
    this.setState({ loading: true });

    //Cria o Id para o Firebase
    var id = new Date();

    // Referencia o coleção dentro do Firebase
    const refTodo = database.firestore().collection("atividades");
    try {
      // Adiciona o item
      await refTodo.doc(id.toString()).set({
        item: this.state.input,
        priority: this.state.select
      });

      // Limpa o campo do input
      this.setState({
        input: '',
      })

      // Lista novamente
      this.listToDo();
    } catch (error) {
      console.log("Error adding document: ", error)
    }
  }

  // Elimina um item da lista de Todo
  handleDelete = async (item) => {
    // Ativa o loading
    this.setState({ loading: true });
    // Ligação do Firebase 
    await database.firestore().collection('atividades').doc(item.id).delete();
    // Lista novamente
    this.listToDo();
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
    backgroundColor: '#FFF',
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
