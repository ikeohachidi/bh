<template>
	<section class="admin-page">
		<div>
			<v-navigation-drawer class="elevation-1" v-if="showNavigation">
				<v-list nav>
					<v-list-item link v-for="route in adminRoutes" :key="route.text" :to="route.path">
						<v-list-item-icon>
							<v-icon>mdi-{{ route.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>{{ route.text }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-navigation-drawer>
		</div>
		<div class="admin-sub-pages">
			<v-container>
				<v-row>
					<v-col cols="11" class="mx-auto">
						<router-view></router-view>
					</v-col>
				</v-row>
			</v-container>
		</div>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { fetchUserData, getUserData } from '@/store/modules/user';

import User from '@/types/User';

@Component
export default class AdminIndex extends Vue {
	private adminRoutes = [
		{ text: 'Dashboard', icon: 'tune', path: '/admin' },
		{ text: 'All Tickets', icon: 'subtitles', path: '/tickets' },
		{ text: 'Shipment Locator', icon: 'map-marker', path: '/shipment' },
		{ text: 'Customers', icon: 'account-multiple-outline', path: '/customers' },
		{ text: 'Products', icon: 'folder-outline', path: '/products' },
	];

	get showNavigation(): boolean {
		return this.$route.meta?.showNavigation ?? true;
	}

	get user(): User {
		return getUserData(this.$store);
	}

	mounted(): void {
		if (!this.user.uuid) {
			fetchUserData(this.$store)
				.catch(() => {
					this.$router.push({ path: '/admin/login' });
				})
		}
	}
}
</script>

<style lang="scss" scoped>
section.admin-page {
	background-color: #FAFAFA;
	display: grid;
	height: 100%;
	grid-template-columns: repeat(12, 1fr);

	& > div:last-of-type {
		grid-column: 2 / 12;
	}
}
</style>