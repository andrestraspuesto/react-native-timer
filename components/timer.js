import React from 'react';
import { StyleSheet, Text, Vibration, TextInput, Button, ScrollView, Dimensions} from 'react-native';
import {Constants} from 'expo'

const buttonTitles = {
	on: "Detener",
	off: "Iniciar"		
}

export default class Timer extends React.Component{
	
	constructor(props){
		super(props)
		this.state = {
			secs: props.secs?props.secs:"",
			running: false,
			buttonTitle: buttonTitles.off,
			text: this.secsToStr(props.secs)
		}
	}


	render(){
		return (
			<ScrollView style={styles.timerContainer} >
				<TextInput placeholder="segundos" 
					keyboardType="numeric" 
					editable={!this.state.running} 
					autoFocus={!this.state.running} 
					onChangeText={this.inputTextChange}
					value={this.state.secs + ""}
					style={[styles.contenidoCentrado, styles.timer]}
				/>
				<Button style={styles.button}
				 	title={this.state.buttonTitle} 
				 	onPress={this.btnPressHandler}/>
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
			let secs = prevState.secs - 1
			return	{
				secs: secs,
				buttonTitle: prevState.buttonTitle,
				running: prevState.running,
				text: this.secsToStr(prevState.secs)
			}
		})
		if(this.state.secs < 1){
			this.stopTimer()
		}
	}
	inputTextChange = (text) => {
		let secs = text.replace(/[^\d]/g,"")
		this.setState((pre) => {
			return {
				secs: secs,
				running: pre.running,
				buttonTitle: pre.buttonTitle,
				text: this.secsToStr(secs)
			}
		})
	}

	btnPressHandler = () => {
		let btnState = buttonTitles.on;
		if(this.state.running){
			btnState = buttonTitles.off;
			clearInterval(this.interval)
		} else {
			this.interval = setInterval(this.inc, 1000)
		}
		this.setState(prevState => {
			return {
				secs: prevState.secs,
				buttonTitle: btnState,
				running: !prevState.running,
				text: this.secsToStr(prevState.secs)
			}
		})
	}

	secsToStr = (secs) => {
		const ss = secs?secs: 0
		const s = ss % 60
		const mm = Math.trunc(ss / 60)
		const m = mm % 60
		const hh = Math.trunc(mm / 60)
		const h = hh % 24
		const d =Math.trunc(hh / 24)
		return `${d}d ${h}h ${m}' ${s}"`
	}
}

const styles = StyleSheet.create({
  timer: {
    flex: 1,
    fontWeight: 'bold',
	fontSize: 50
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
	width: 70,
	height: 150
  },
  contenidoCentrado: {
	  textAlign: "center"
  }
});
