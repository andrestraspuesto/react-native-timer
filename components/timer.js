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

import { Constants } from 'expo'

const timing = [25, 5]

export default class Timer extends React.Component {

	constructor(props) {
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


	render() {
		return (
			<ScrollView style={styles.timerContainer} >
				<View style={styles.inputGroup}>
					<Text style={styles.label}>Working time</Text>
					<TextInput placeholder="minutes"
						keyboardType="numeric"
						editable={!this.state.running}
						onChangeText={this.inputWorkingTimeChange}
						value={this.state.workingTime + ""}
						style={[styles.contenidoCentrado,  styles.input]}
						autoFocus={!this.state.running}
					/>
				</View>
				<View style={styles.inputGroup}>
					<Text style={styles.label}>Break time</Text>
					<TextInput placeholder="minutes"
						keyboardType="numeric"
						editable={!this.state.running}
						onChangeText={this.inputBreakTimeChange}
						value={this.state.breakTime + ""}
						style={[styles.contenidoCentrado, styles.input]}
					/>
				</View>
				<View style={[styles.btnGroup]}>
					<View style={styles.button}>
						<Button title="Start" disabled={this.state.running} onPress={this.startPressHandler} />
					</View>
					<View style={styles.button}>
						<Button style={styles.button} title="Stop" disabled={!this.state.running}
							onPress={this.stopPressHandler} />
					</View>
					<View style={styles.button}>
						<Button style={styles.button} title="Reset" onPress={this.resetPressHandler} />
					</View>
					
				</View>

				<Text style={[styles.counter]}>
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
		const secs = this.state.secs - 1
		const text = this.secsToStr(secs)
		const newState = {
			secs: this.state.secs - 1,
			text: this.secsToStr(secs)
		}
		this.setState(newState)
		if (this.state.secs < 1) {
			this.changeStage()
		}
	}

	changeStage = () => {
		this.stopTimer()
		const secs2 = this.state.working ? this.state.breakTime * 60 : this.state.workingTime * 60
		const changeState = {
			secs: secs2,
			text: this.secsToStr(secs2),
			working: !this.state.working
		}
		this.setState(changeState)
		this.interval = setInterval(this.inc, 1000)
	}

	inputBreakTimeChange = (text) => {
		if (+text >= 0) {
			const breakTime = text
			this.setState({ breakTime })
		}
	}

	inputWorkingTimeChange = (n) => {
		if (+n >= 0) {
			const workingTime = +n || 0
			const secs = +workingTime * 60
			const text = this.secsToStr(secs)
			this.setState({ secs, text, workingTime })
		}
	}

	startPressHandler = () => {
		const running = true
		this.setState({ running })
		this.interval = setInterval(this.inc, 1000)

	}


	stopPressHandler = () => {
		clearInterval(this.interval)
		const running = false
		this.setState({ running })
	}

	resetPressHandler = () => {
		clearInterval(this.interval)
		const secs = timing[0] * 60
		const newState = {
			secs: secs,
			working: true,
			running: false,
			text: this.secsToStr(secs),
			workingTime: timing[0],
			breakTime: timing[1],
		}
		this.setState(newState)
	}

	secsToStr = (secs) => {
		const ss = secs ? secs : 0
		const s = ss % 60
		const mm = Math.trunc(ss / 60)
		const m = mm % 60
		return `${m}' ${s}"`
	}
}

const styles = StyleSheet.create({
	label: {
		flex: 1,
		fontWeight: 'bold',
		fontSize: 20,
	},
	timerContainer: {
		width: Dimensions.get('window').width,
		padding: 5
	},
	button: {
		width:100,
		justifyContent: "center",
		alignContent: "stretch"
	},
	input: {
		flex: 1,
		fontWeight: 'bold',
		fontSize: 20,
		borderRadius: 4,
		borderWidth: 0.5,
		borderColor: '#555555'
	},
	contenidoCentrado: {
		textAlign: "center"
	},
	inputGroup: {
		flexDirection: "row",
		padding: 2
	},
	btnGroup: {
		justifyContent: "space-around",
		flexDirection: "row",
		padding: 5
	},
	counter: {
		fontWeight: 'bold',
		fontSize: 50,
		textAlign: "center"
	}
});
