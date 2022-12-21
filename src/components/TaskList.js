import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function TaskList({ data, handleDelete }) {
	return (
		<Animatable.View
			style={styles.container}
			animation="bounceIn"
			useNativeDriver >
			{/* O ITEM FUNCIONA COMO UM BOTÃO */}
			<TouchableOpacity
				onPress={() => handleDelete(data)}
				style={styles.taskList}>

				{/* TEXTO DA ATIVIDADE */}
				<Text style={styles.task}> {data.item}</Text>

				{/* COR DA PRIORIDADE DA ATIVIDADE */}
				<View style={[
					styles.sqPriority,
					(data.priority == 2) ?
						styles.clHigh : (data.priority == 1) ?
							styles.clMedium : styles.clLow]} />
			</TouchableOpacity>
		</Animatable.View >
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},

	sqPriority: {
		width: 25,
		height: 25,
		marginRight: 5,
	},

	clLow: {
		backgroundColor: '#FFD700'
	},

	clMedium: {
		backgroundColor: '#ffa500'
	},

	clHigh: {
		backgroundColor: '#e25822'
	},

	container: {
		flex: 1,
		margin: 10,
		marginLeft: 25,
		marginRight: 25,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
		padding: 7,
		elevation: 1.5,
		shadowOpacity: 0.1,
		shadowColor: '#000',
		shadowOffset: {
			width: 1,
			height: 3,
		}
	},

	taskList: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	task: {
		flex: 1,
		color: '#121212',
		fontSize: 12,
	}
});