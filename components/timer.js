import React from 'react';
import { 
	StyleSheet, 
	Text, 
	Vibration, 
	TextInput, 
	Button, 
	ScrollView, 
	Dimensions,
	View
} from 'react-native';

import {Constants} from 'expo'

const timing = [25, 5]

export default class Timer extends React.Component{
	
	constructor(props){
		super(props)
		this.state = {
			secs: timing[0] * 60,
			running: false,
			working: true,
			text: this.secsToStr(timing[0] * 60),
			workingTime: timing[0],
			breakTime: timing[1],
		}
	}


	render(){
		return (
			<ScrollView style={styles.timerContainer} >
				<View style={styles.inputGroup}>
					<Text style={styles.timer}>Working time</Text>
					<TextInput placeholder="minutes" 
					keyboardType="numeric" 
					editable={!this.state.running} 
					onChangeText={this.inputWorkingTimeChange}
					value={this.state.workingTime + ""}
					style={[styles.contenidoCentrado, styles.timer]}
					autoFocus={!this.state.running}
				/>
				</View>
				<View style={styles.inputGroup}>
					<Text style={styles.timer}>Break time</Text>
					<TextInput placeholder="minutes" 
					keyboardType="numeric" 
					editable={!this.state.running} 
					onChangeText={this.inputBreakTimeChange}
					value={this.state.breakTime + ""}
					style={[styles.contenidoCentrado, styles.timer]}
				/>
				</View>
				<View style={[styles.inputGroup, styles.btnGroup]}>
					<Button style={styles.button} title="Start" disabled={this.state.running}
						onPress={this.startPressHandler}/>
					<Button style={styles.button} title="Stop" disabled={!this.state.running}
						onPress={this.stopPressHandler}/>
					<Button style={styles.button} title="Reset"
						onPress={this.resetPressHandler}/>
				</View>
				
				<Text style={[styles.timer, styles.contenidoCentrado]}> 
					{this.state.text}
				</Text>
			</ScrollView>
		)
	}

	stopTimer = () => {
		clearInterval(this.interval)
		Vibration.vibrate([500, 500, 500])
	}

	inc = () => {
		console.log(this.state.secs);
		
		this.setState(prevState => {
			return	{
				secs: (prevState.secs - 1),
				working: prevState.working,
				running: prevState.running,
				text: this.secsToStr(prevState.secs),
				workingTime: prevState.workingTime,
				breakTime: prevState.breakTime,
			}
		})
		if(this.state.secs < 1){
			this.stopTimer()
			this.setState(prevState => {
				const secs = prevState.working? prevState.breakTime * 60: prevState.workingTime * 60
				return {
					secs: secs,
					working: !prevState.working,
					running: prevState.running,
					text: this.secsToStr(secs),
					workingTime: prevState.workingTime,
					breakTime: prevState.breakTime,
				}
			})
			this.interval = setInterval(this.inc, 1000)
		}
	}

	inputBreakTimeChange = (text) => {
		this.setState((pre) => {
			return {
				secs: pre.secs,
				running: pre.running,
				buttonTitle: pre.buttonTitle,
				text: pre.text,
				workingTime: pre.workingTime,
				breakTime: text.replace(/[^\d]/g,""),
			}
		})
	}

	inputWorkingTimeChange = (text) => {
		const t = text.replace(/[^\d]/g,"");
		const secs = (t? +t:0) * 60
		this.setState((pre) => {
			return {
				secs: secs,
				running: pre.running,
				working: true,
				text: this.secsToStr(secs),
				workingTime: t,
				breakTime: pre.breakTime,
			}
		})
	}

	startPressHandler = () => {
		this.setState(prevState => {
			return {
				secs: prevState.secs,
				working: prevState.working,
				running: true,
				text: prevState.text,
				workingTime: prevState.workingTime,
				breakTime: prevState.breakTime,
			}
		})
		this.interval = setInterval(this.inc, 1000)
		
	}


	stopPressHandler = () => {
		clearInterval(this.interval)
		this.setState(prevState => {
			return {
				secs: prevState.secs,
				working: prevState.working,
				running: false,
				text: prevState.text,
				workingTime: prevState.workingTime,
				breakTime: prevState.breakTime,
			}
		})
	}

	resetPressHandler = () => {
		clearInterval(this.interval)
		const secs = timing[0] * 60
		this.setState(prevState => ({
			secs: secs,
			working: true,
			running: false,
			text: this.secsToStr(secs),
			workingTime: timing[0],
			breakTime: timing[1],
		}))
	}

	secsToStr = (secs) => {
		const ss = secs?secs: 0
		const s = ss % 60
		const mm = Math.trunc(ss / 60)
		const m = mm % 60
		return `${m}' ${s}"`
	}
}

const styles = StyleSheet.create({
  timer: {
    flex: 1,
    fontWeight: 'bold',
		fontSize: 30
  },
  timerContainer:{
		flex: 1,
    fontWeight: 'bold',
		fontSize: 30,
		marginTop: Constants.statusBarHeight,
    alignSelf: "center",
    width: Dimensions.get('window').width
  },
  button: {

  },
  contenidoCentrado: {
	  textAlign: "center"
	},
	inputGroup: {
		flexDirection: "row",
		flex: 1,
		alignItems: "stretch"
	},
	btnGroup: {
		alignContent: "center",
		justifyContent: "space-between"
	}
});
