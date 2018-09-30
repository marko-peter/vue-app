Vue.component('comment-section', {
  template: `
  <div>
  	<h2 class="comment-heading">Comments:</h2>
	  <!-- list of comments -->
	  <comment-list			
	    v-for="comment in feed.comments"
	    v-bind:key="comment.id"
	    v-bind:comment="comment"
	    v-on:deleteComment="deleteComment">
	  </comment-list>

	  <!-- form for adding comments -->
	  <div class="card card-form">
	    <div class="card-body">
	      <my-form
	      	btnText="Add Comment"
	        v-bind:feedName="nameInForm"
	        v-bind:feedText="textInForm"	        
	        v-on:formSubmitted="addComment">
	      </my-form>
	    </div>
	  </div>
  </div>`,
  name: "CommentSection",

	props: {
		feed: Object,		
	},

	data: function() {
		return {
			// props values for MyForm componenet
			nameInForm: '',
			textInForm: ''	
		}
	},

	methods: {
		// add comment to DB
		addComment: function(newComment) {
			newComment.timestamp = Date.now();			
			api.createComment(this.feed.id, newComment)
				.then(response => {
					if(response.status === 200) {
						// emit event to parent component
						this.$emit('commentChange', this.feed.id);

						// this is just for emptying add form after submit
						if(this.nameInForm == '') this.nameInForm = null;
						else this.nameInForm = '';
						if(this.textInForm == '') this.textInForm = null;
						else this.textInForm = '';	
					}
				})
				.catch( e => console.log(e));
		},
		// delete comment from DB
		deleteComment: function(commentId) {
			api.deleteComment(commentId)
				.then(response => {
					if(response.status === 200) {
						// emit event to parent component
						this.$emit('commentChange', this.feed.id);
					}
				})
				// handle errors
				.catch(e => console.log(e));
		}
	}
})