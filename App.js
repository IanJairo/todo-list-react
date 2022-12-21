import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import {
  StyleSheet, Text, SafeAreaView, View, TouchableOpacity, TextInput, FlatList
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

import TaskList from './src/components/TaskList'


export default function App() {
  {/* VARIÁVEIS */ }
  const [task, setTask] = useState([]);
  const [input, setInput] = useState('');
  const [select, setSelect] = useState('');

  {/* ADICIONA A TAREFA*/ }

  function handleAdd() {
    if (input == '') return alert('Preencha o campo');
    if (select == '') return alert('Selecione a prioridade');

    {/* DICIONARIO DOS DADOS DA TAREFA*/ }
    const data = {
      key: input,
      task: input,
      priority: select

    };



    setTask([data, ...task]);
    setInput('');

  }

  {/* EXCLUI A TAREFA*/ }
  const handleDelete = useCallback((data) => {
    const find = task.filter(r => r.key !== data.key);
    setTask(find);
  });
  return (

    <SafeAreaView style={styles.container} >
      <StatusBar style="dark" />


      {/* HEADER */}

      <View style={styles.content}>
        <Text style={styles.title}>TODO</Text>
        <Text style={styles.title1}>LIST</Text>
      </View>



      <View style={styles.new_text}>
        {/* CAIXA DE TEXTO*/}
        <TextInput
          multiline={true}
          placeholder="Nova Tarefa"
          autoCorrect={false}
          style={styles.input}
          value={input}
          onChangeText={(texto) => setInput(texto)}

        />

        {/* BOTÃO DE ADICIONAR */}

        <TouchableOpacity
          style={styles.add}
          onPress={handleAdd}
        >
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
          onValueChange={(value) => setSelect(value)}
          items={[
            { label: 'Low', value: '#ffa500' },
            { label: 'Medium', value: '#FFD700' },
            { label: 'High', value: '#e25822' },
          ]}
        />
      </View>

      {/* LISTAGEM DAS ATIVIDADES*/}
      <View style={styles.lista}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={task}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => <TaskList data={item} handleDelete={handleDelete} />}
        />

      </View>


    </SafeAreaView>


  );
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
