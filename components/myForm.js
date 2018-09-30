Vue.component('my-form', {
  template: `
  <form v-on:submit.prevent="onSubmit">
		<!-- input for feed/comment name -->
		<div class="form-group">
			<label for="name">Name</label>
			<input type="text" class="form-control" id="name" required v-model="bindName">
		</div>
		<!-- textarea for feed/comment text -->
		<div class="form-group">
			<label for="text">Text</label>
			<textarea class="form-control" id="text" rows="9" required v-model="bindText"></textarea>
		</div>
		<!-- submit button -->
		<button type="submit" class="btn btn-primary">{{btnText}}</button>
  </form>`,
  name: "MyForm",

	// If props are provided, their values are default 
	// values of input and textarea.
	props: {
		feedName: {
			type: String,
			default: ''
		},		
		feedText: {
			type: String,
			default: ''
		},
		btnText: {
			type: String,
			default:'Submit'
		}
	},

	data: function() {
		return {
			name: '',
			text: ''
		}
	},
	
	// Computed properties set the default values and
	// binds newValues to data (name, text). 
	computed: {
		bindName: {
			get: function() {
				return this.feedName;
			},
			set: function(newValue) {
				this.name = newValue;
			}
		},
		bindText: {
			get: function() {
				return this.feedText;
			},
			set: function(newValue) {
				this.text = newValue;
			}
		}
	},

	// onSubmit method send entered data to parent component
	methods: {
		onSubmit: function() {			
			// conditions for "edit feed form"
			// if both variables stay unchanged, nothing to edit
			// if only one is changed, the second is assigned with props value
			if(!this.name && !this.text) return;
			if(this.name === '') this.name = this.feedName;
			if(this.text === '') this.text = this.feedText;
			
			let item = {
				name: this.name,
				text: this.text
			};
			// emit the event to the parent component
			this.$emit('formSubmitted', item);
			this.name = '';
			this.text = '';
		}
	}
})