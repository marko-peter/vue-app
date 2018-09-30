Vue.component('list-item', {
  template: `
  <div class="card float-lg-left" v-bind:id="feed.id">		
		<div class="card-body">
			<!-- name(heading) -->
			<h5 class="card-title truncate">{{feed.name}}</h5>
			<!-- date and comments tag -->
			<h6 class="card-subtitle mb-2 text-muted">{{new Date(feed.timestamp).toDateString()}}					
				<span class="badge badge-primary">Comments: {{feed.comments.length}}</span>
			</h6>
			<!-- main text -->
			<p class="card-text fade-text">{{feed.text}}</p>			
			<!-- delete button -->
			<a href="#" class="delete" v-on:click.prevent="deleteItem(feed.id)"><i class="far fa-trash-alt"></i></a>
			<!-- link to detail page -->
			<router-link v-bind:to="'/detail/' + feed.id">
				<a href="#" class="btn btn-outline-primary btn-sm">Detail</a>
			</router-link>
			<!-- like icon -->
			<span class="float-right"><i class="far fa-thumbs-up"></i> {{feed.likes}}</span>	
		</div>	
  </div>`,
  name: "ListItem",

	props: {
		feed: Object
	},

	methods: {
		// delete feed from DB
		deleteItem: function(id) {
      api.deleteFeed(id)
      .then( response => {
        if(response.status === 200) {
					// emit event to parent component
          this.$emit('delete', id);
        }        
			})
			// handle errors
      .catch( e => console.log(e) );
    }
	}
})