1 // Red Dot Logics,  HDP-MXB1616 4k HDMI Matrix

var tcp = require('../../tcp')
var instance_skel = require('../../instance_skel')
var debug
var log

function instance(system, id, config) {
	var self = this

	// super-constructor
	instance_skel.apply(this, arguments)

	self.actions() // export actions

	return self
}

instance.prototype.updateConfig = function (config) {
	var self = this

	self.config = config
	self.init_tcp()
}

instance.prototype.init = function () {
	var self = this

	debug = self.debug
	log = self.log

	self.init_tcp()
}

instance.prototype.init_tcp = function () {
	var self = this

	if (self.socket !== undefined) {
		self.socket.destroy()
		delete self.socket
	}

	if (self.config.port === undefined) {
		self.config.port = 23
	}

	if (self.config.host) {
		self.socket = new tcp(self.config.host, self.config.port)

		self.socket.on('status_change', function (status, message) {
			self.status(status, message)
		})

		self.socket.on('error', function (err) {
			debug('Network error', err)
			self.log('error', 'Network error: ' + err.message)
		})

		self.socket.on('connect', function () {
			debug('Connected')
			self.socket.send('\r\n')
		})
	}
}

// Return config fields for web config
instance.prototype.config_fields = function () {
	var self = this

	return [
		{
			type: 'text',
			id: 'info',
			width: 12,
			label: 'Information',
			value: 'This module is for RDL-MX4k1616 & RDL-MX4k88 Non Seamless Matrix.',
		},
		{
			type: 'textinput',
			id: 'host',
			label: 'IP Address',
			width: 6,
			default: '192.168.1.100',
			regex: self.REGEX_IP,
		},
		{
			type: 'textinput',
			id: 'port',
			label: 'Port',
			width: 6,
			default: '23',
			regex: self.REGEX_PORT,
		},
	]
}

// When module gets deleted
instance.prototype.destroy = function () {
	var self = this

	if (self.socket !== undefined) {
		self.socket.destroy()
	}

	debug('destroy', self.id)
}

instance.prototype.actions = function () {
	var self = this

	self.system.emit('instance_actions', self.id, {
		route: {
			label: 'Route input to output',
			options: [
				{
					type: 'dropdown',
					label: 'Input',
					id: 'input',
					default: '1',
					choices: [
						{ id: '1', label: 'Input 1' },
						{ id: '2', label: 'Input 2' },
						{ id: '3', label: 'Input 3' },
						{ id: '4', label: 'Input 4' },
						{ id: '5', label: 'Input 5' },
						{ id: '6', label: 'Input 6' },
						{ id: '7', label: 'Input 7' },
						{ id: '8', label: 'Input 8' },
						{ id: '9', label: 'Input 9' },
						{ id: '10', label: 'Input 10' },
						{ id: '11', label: 'Input 11' },
						{ id: '12', label: 'Input 12' },
						{ id: '13', label: 'Input 13' },
						{ id: '14', label: 'Input 14' },
						{ id: '15', label: 'Input 15' },
						{ id: '16', label: 'Input 16' },
					],
				},
				{
					type: 'dropdown',
					label: 'Output',
					id: 'output',
					default: '1',
					choices: [
						{ id: '1', label: 'Output 1' },
						{ id: '2', label: 'Output 2' },
						{ id: '3', label: 'Output 3' },
						{ id: '4', label: 'Output 4' },
						{ id: '5', label: 'Output 5' },
						{ id: '6', label: 'Output 6' },
						{ id: '7', label: 'Output 7' },
						{ id: '8', label: 'Output 8' },
						{ id: '9', label: 'Output 9' },
						{ id: '10', label: 'Output 10' },
						{ id: '11', label: 'Output 11' },
						{ id: '12', label: 'Output 12' },
						{ id: '13', label: 'Output 13' },
						{ id: '14', label: 'Output 14' },
						{ id: '15', label: 'Output 15' },
						{ id: '16', label: 'Output 16' },
					],
				},
			],
		},
		//---------------------------------------------------------
		preset_recall: {
			label: 'Recall Preset',
			options: [
				{
					type: 'dropdown',
					label: 'Preset',
					id: 'preset',
					default: '1',
					choices: [
						{ id: '1', label: 'Preset 1' },
						{ id: '2', label: 'Preset 2' },
						{ id: '3', label: 'Preset 3' },
						{ id: '4', label: 'Preset 4' },
						{ id: '5', label: 'Preset 5' },
						{ id: '6', label: 'Preset 6' },
						{ id: '7', label: 'Preset 7' },
						{ id: '8', label: 'Preset 8' },
					],
				},
			],
		},
		//---------------------------------------------------------
		preset_save: {
			label: 'Save Preset',
			options: [
				{
					type: 'dropdown',
					label: 'Preset',
					id: 'preset',
					default: '1',
					choices: [
						{ id: '1', label: 'Preset 1' },
						{ id: '2', label: 'Preset 2' },
						{ id: '3', label: 'Preset 3' },
						{ id: '4', label: 'Preset 4' },
						{ id: '5', label: 'Preset 5' },
						{ id: '6', label: 'Preset 6' },
						{ id: '7', label: 'Preset 7' },
						{ id: '8', label: 'Preset 8' },
					],
				},
			],
		},
		//--------------------------------------------------------
		'set_edid': {
			label: 'Change EDID',
			options: [
				{
					type: 'dropdown',
					label: 'Select Input',
					id: 'select_input',
					default: '0',
					choices: [
						{ id: '0', label: 'All Inputs' },
						{ id: '1', label: 'Input 1' },
						{ id: '2', label: 'Input 2' },
						{ id: '3', label: 'Input 3' },
						{ id: '4', label: 'Input 4' },
						{ id: '5', label: 'Input 5' },
						{ id: '6', label: 'Input 6' },
						{ id: '7', label: 'Input 7' },
						{ id: '8', label: 'Input 8' },
						{ id: '9', label: 'Input 9' },
						{ id: '10', label: 'Input 10' },
						{ id: '11', label: 'Input 11' },
						{ id: '12', label: 'Input 12' },
						{ id: '13', label: 'Input 13' },
						{ id: '14', label: 'Input 14' },
						{ id: '15', label: 'Input 15' },
						{ id: '16', label: 'Input 16' },
					],
				},
				{
					type: 'dropdown',
					label: 'EDID',
					id: 'select_edid',
					default: '1',
					choices: [
						{ id: '1', label: '1080p @60 ,Stereo Audio 2.0' },
						{ id: '2', label: '1080p @60 ,Dolby/DTS 5.1' },
						{ id: '3', label: '1080p @60 ,HD Audio 7.1' },
						{ id: '4', label: '1080i,Stereo Audio 2.0' },
						{ id: '5', label: '1080i,Dolby/DTS 5.1' },
						{ id: '6', label: '1080i,HD Audio 7.1' },
						{ id: '7', label: '3D,Stereo Audio 2.0' },
						{ id: '8', label: '3D,Dolby/DTS 5.1' },
						{ id: '9', label: '3D,HD Audio 7.1' },
						{ id: '10', label: '4K @30 4:4:4,Stereo Audio 2.0' },
						{ id: '11', label: '4K @30 4:4:4,Dolby/DTS 5.1' },
						{ id: '12', label: '4K @30 4:4:4,HD Audio 7.1' },
						{ id: '13', label: '4K @60 4:2:0,Stereo Audio 2.0' },
						{ id: '14', label: '4K @60 4:2:0,Dolby/DTS 5.1' },
						{ id: '15', label: '4K @60 4:2:0,HD Audio 7.1' },
						{ id: '16', label: '4K @60 4:4:4,Stereo Audio 2.0' },
						{ id: '17', label: '4K @60 4:4:4,Dolby/DTS 5.1' },
						{ id: '18', label: '4K @60 4:4:4,HD Audio 7.1 ' },
						{ id: '19', label: '4K @60 4:4:4,Stereo Audio 2.0 HDR' },
						{ id: '20', label: '4K @60 4:4:4,Dolby/DTS 5.1 HDR' },
						{ id: '21', label: '4K @60 4:4:4,HD Audio 7.1 HDR' },
						{ id: '22', label: 'User 1' },
						{ id: '23', label: 'User 2' },
						{ id: '24', label: 'Copy from HDMI output 1' },
						{ id: '25', label: 'Copy from HDMI output 2' },
						{ id: '26', label: 'Copy from HDMI output 3' },
						{ id: '27', label: 'Copy from HDMI output 4' },
						{ id: '28', label: 'Copy from HDMI output 5' },
						{ id: '29', label: 'Copy from HDMI output 6' },
						{ id: '30', label: 'Copy from HDMI output 7' },
						{ id: '31', label: 'Copy from HDMI output 8' },
						{ id: '32', label: 'Copy from HDMI output 9' },
						{ id: '33', label: 'Copy from HDMI output 10' },
						{ id: '34', label: 'Copy from HDMI output 11' },
						{ id: '35', label: 'Copy from HDMI output 12' },
						{ id: '36', label: 'Copy from HDMI output 13' },
						{ id: '37', label: 'Copy from HDMI output 14' },
						{ id: '38', label: 'Copy from HDMI output 15' },
						{ id: '39', label: 'Copy from HDMI output 16' },
					],
				},
			],
		},
		//---------------------------------------------------------
		power: {
			label: 'Power',
			options: [
				{
					type: 'dropdown',
					label: 'Power',
					id: 'power_set',
					default: '1',
					choices: [
						{ id: '0', label: 'Off' },
						{ id: '1', label: 'On' },
					],
				},
			],
		},
	})
}

instance.prototype.action = function (action) {
	var self = this
	var cmd
	var options = action.options

	switch (action.action) {
		case 'route':
			cmd = 's in ' + options.input + ' av out ' + options.output + '!'
			console.log(cmd)
			//s in 6 av out 2!/n
			break
		case 'preset_recall':
			cmd = 's recall preset ' + options.preset + '!'
			//s recall preset 1!
			break
		case 'preset_save':
			cmd = 's save preset ' + options.preset + '!'
			//s save preset 1!
			break
		case 'set_edid':
			cmd = 's edid in ' + options.select_input + ' from ' + options.select_edid + '!'
			//s edid in x from z!
			break
		case 'power':
			cmd = 's power ' + options.power_set + '!'
			//s power z!
			break
	}

	if (cmd !== undefined) {
		if (self.socket !== undefined && self.socket.connected) {
			var randomnum = Math.floor(Math.random() * (1000 - 200) + 100)
			console.log('Random #' + randomnum)
			setTimeout(function () {
				self.socket.send(cmd + '\r\n')
				console.log('executing' + cmd)
			}, randomnum)
		} else {
			debug('Socket not connected :(')
		}
	}
}

instance_skel.extendedBy(instance)
exports = module.exports = instance
