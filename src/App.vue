<template>
	<div id="app">
		 <!-- :key="time" -->
		<router-view/>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

	@Component({
		name: 'App',
	})
    class App extends Vue {
		currnetRouter: string = '';
		transitionName: string = 'slide-right';
		time: any = 123534;
		
		@Watch('time') setData(): void {
			setTimeout(() => {
				if (this.$children[0]) {
                    this.$children[0].update = this.time;
				}
			}, 100);
		}

		@Watch('$route') updateRoute(to: any, from: any): void {
			const toDepth = to.path.split('/').length
			const fromDepth = from.path.split('/').length
			this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
		}
		
		mounted() {
			this.setData();
		}

		
	}
	
	export default App;
</script>