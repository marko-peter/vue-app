Vue.component('comment-list', {
  template: `
  <div class="card comment-card">
		<div class="card-body comment-body">
			<!-- icon -->
			<i class="far fa-user"></i>
			<!-- comment name -->
			<b class="comment-name ml-3">{{comment.name}}</b> 
			<!-- date -->
			<small class="comment-date ml-5">{{new Date(comment.timestamp).toDateString()}}</small>
			
			<!-- delete button -->
			<a href="#" class="float-right" v-on:click.prevent="$emit('deleteComment', comment.id)">
				<i class="far fa-trash-alt"></i>
			</a>

			<hr class="comment-line">
			<!-- comment text -->
			<p class="comment-text">{{comment.text}}</p>
		</div>
  </div>`,
  name: "CommentList",
	
	props: {
		comment: Object
	}
})