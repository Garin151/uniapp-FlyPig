<template>
	<view>
		<!-- 搜索 -->
		<view class="search-containier">
			<view class="search-code">
				<image
					src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTY0NTgzOTM3MTY4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjcwOCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMzg2LjkgOTI3SDIzNi43Yy03Ni41IDAtMTM4LjgtNjIuMy0xMzguOC0xMzguOFY2MzguMWMwLTEzLjggMTEuMi0yNSAyNS0yNXMyNSAxMS4yIDI1IDI1djE1MC4xYzAgNDguOSAzOS44IDg4LjggODguOCA4OC44aDE1MC4xYzEzLjggMCAyNSAxMS4yIDI1IDI1cy0xMS4xIDI1LTI0LjkgMjV6TTEyMi45IDQxMS45Yy0xMy44IDAtMjUtMTEuMi0yNS0yNVYyMzYuN2MwLTc2LjUgNjIuMy0xMzguOCAxMzguOC0xMzguOGgxNTAuMWMxMy44IDAgMjUgMTEuMiAyNSAyNXMtMTEuMiAyNS0yNSAyNUgyMzYuN2MtNDguOSAwLTg4LjggMzkuOC04OC44IDg4Ljh2MTUwLjFjMCAxMy45LTExLjEgMjUuMS0yNSAyNS4xeiIgcC1pZD0iNzA5IiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+PHBhdGggZD0iTTkwMiA0MTEuOWMtMTMuOCAwLTI1LTExLjItMjUtMjVWMjM2LjdjMC00OC45LTM5LjgtODguOC04OC44LTg4LjhINjM4LjFjLTEzLjggMC0yNS0xMS4yLTI1LTI1czExLjItMjUgMjUtMjVoMTUwLjFjNzYuNSAwIDEzOC44IDYyLjMgMTM4LjggMTM4Ljh2MTUwLjFjMCAxMy45LTExLjIgMjUuMS0yNSAyNS4xek03ODguMiA5MjdINjM4LjFjLTEzLjggMC0yNS0xMS4yLTI1LTI1czExLjItMjUgMjUtMjVoMTUwLjFjNDguOSAwIDg4LjgtMzkuOCA4OC44LTg4LjhWNjM4LjFjMC0xMy44IDExLjItMjUgMjUtMjVzMjUgMTEuMiAyNSAyNXYxNTAuMWMwIDc2LjUtNjIuMyAxMzguOC0xMzguOCAxMzguOHoiIHAtaWQ9IjcxMCIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjxwYXRoIGQ9Ik03NTIgNTM2LjFIMjcyLjljLTEzLjggMC0yNS0xMS4yLTI1LTI1czExLjItMjUgMjUtMjVINzUyYzEzLjggMCAyNSAxMS4yIDI1IDI1cy0xMS4yIDI1LTI1IDI1eiIgcC1pZD0iNzExIiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+PC9zdmc+"
					mode=""
					class=".search-code-image"
				></image>
			</view>
			<view class="search" @click="ToSearchPage()">
				<image
					src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTY0NTg0MjAwNzAwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1ODIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTQ5Ny4yNDggODE2LjE2YTMzNi4xOTIgMzM2LjE5MiAwIDAgMS0yMzguNDk2LTk4LjgxNkEzMzYuMTYgMzM2LjE2IDAgMCAxIDE2MCA0NzguODQ4YTMzNi4xOTIgMzM2LjE5MiAwIDAgMSA5OC43ODQtMjM4LjQ5NiAzMzYuMzIgMzM2LjMyIDAgMCAxIDIzOC40OTYtOTguODE2IDMzNS45MzYgMzM1LjkzNiAwIDAgMSAyMzguNDY0IDk4LjgxNiAzMzYuMTkyIDMzNi4xOTIgMCAwIDEgOTguODE2IDIzOC40OTYgMzM2LjE5MiAzMzYuMTkyIDAgMCAxLTk4LjgxNiAyMzguNDk2IDMzNC45NDQgMzM0Ljk0NCAwIDAgMS0xMTEuNTg0IDc0LjA4IDMzNS42MTYgMzM1LjYxNiAwIDAgMS0xMjYuOTEyIDI0LjczNnogbTAuMDMyLTYyNC4zODRjLTc2LjY3MiAwLTE0OC44IDI5Ljg1Ni0yMDMuMDQgODQuMDk2LTExMS45MDQgMTExLjkzNi0xMTEuOTA0IDI5NC4wOCAwIDQwNi4wMTZhMjg1LjIxNiAyODUuMjE2IDAgMCAwIDIwMy4wMDggODQuMDk2IDI4NS4yMTYgMjg1LjIxNiAwIDAgMCAyMDMuMDA4LTg0LjA5NiAyODUuMjQ4IDI4NS4yNDggMCAwIDAgODQuMTI4LTIwMy4wMDggMjg1LjEyIDI4NS4xMiAwIDAgMC04NC4xMjgtMjAyLjk3NiAyODQuOTkyIDI4NC45OTIgMCAwIDAtMjAyLjk3Ni04NC4xMjh6IiBwLWlkPSIxNTgzIj48L3BhdGg+PHBhdGggZD0iTTgzOC45MTIgODgyLjQzMmEyNC45NiAyNC45NiAwIDAgMS0xNy43MjgtNy4zNmwtMTM4Ljk3Ni0xMzguOTc2YTI1LjEyIDI1LjEyIDAgMCAxIDM1LjQ4OC0zNS40ODhsMTM4Ljk3NiAxMzguOTc2YTI1LjEyIDI1LjEyIDAgMCAxLTE3Ljc2IDQyLjg0OHoiIHAtaWQ9IjE1ODQiPjwvcGF0aD48L3N2Zz4="
					mode=""
					class="search-img"
				></image>
				<input class="search-input" type="text" placeholder="请输入文字" disabled="" />
			</view>
			<view class="search-code">
				<image
					src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTY0NTgzNzUyMTQ4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjExODc5IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik0yOTQuNCA0MjQuOTZjLTI4LjE2IDAtNTEuMiAyMy4wNC01MS4yIDUxLjJzMjMuMDQgNTEuMiA1MS4yIDUxLjIgNTEuMi0yMy4wNCA1MS4yLTUxLjItMjMuMDQtNTEuMi01MS4yLTUxLjJ6IG0yMDQuOCAwYy0yOC4xNiAwLTUxLjIgMjMuMDQtNTEuMiA1MS4yczIzLjA0IDUxLjIgNTEuMiA1MS4yIDUxLjItMjMuMDQgNTEuMi01MS4yLTIzLjA0LTUxLjItNTEuMi01MS4yeiBtMjA0LjggMGMtMjguMTYgMC01MS4yIDIzLjA0LTUxLjIgNTEuMnMyMy4wNCA1MS4yIDUxLjIgNTEuMiA1MS4yLTIzLjA0IDUxLjItNTEuMi0yMy4wNC01MS4yLTUxLjItNTEuMnogbS0yMDQuOC0zMDcuMmMtMjI1LjI4IDAtNDA5LjYgMTYxLjI4LTQwOS42IDM1OC40IDAgMTEyLjY0IDU4Ljg4IDIxNS4wNCAxNTMuNiAyNzkuMDR2MTgxLjc2bDE3OS4yLTExMC4wOGMyNS42IDUuMTIgNTEuMiA3LjY4IDc2LjggNy42OCAyMjUuMjggMCA0MDkuNi0xNjEuMjggNDA5LjYtMzU4LjQgMC0xOTkuNjgtMTg0LjMyLTM1OC40LTQwOS42LTM1OC40eiBtMCA2NjUuNmMtMzAuNzIgMC01OC44OC0yLjU2LTg3LjA0LTEwLjI0TDI5MS44NCA4NDQuOGwyLjU2LTExNy43NmMtOTIuMTYtNTYuMzItMTUzLjYtMTQ4LjQ4LTE1My42LTI1MC44OCAwLTE2OC45NiAxNjEuMjgtMzA3LjIgMzU4LjQtMzA3LjJzMzU4LjQgMTM4LjI0IDM1OC40IDMwNy4yLTE2MS4yOCAzMDcuMi0zNTguNCAzMDcuMnoiIHAtaWQ9IjExODgwIiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+PC9zdmc+"
					mode=""
					class=".search-code-image"
				></image>
			</view>
		</view>
		<!-- 推荐轮播图 -->
		<view>
			<swiper :indicator-dots="true" 
					:autoplay="true" 
					:interval="3000" 
					:duration="1000" 
					:circular="true"
					indicator-color="rgba(255,255,255)"
					indicator-active-color="#00ff00"
					class="swiper-container"
			>
				<block v-for="(item,index) in Banners" :key="index">
					<swiper-item>
						<view class="swiper-item" @click="localCont()"><image :src="item.image" mode="aspectFill" class="imageurl"></image></view>
					</swiper-item>
				</block>
			</swiper>
		</view>
	</view>
</template>

<script>
export default{
	name:"search",
	props:{
		Banners: Array
	},
	
	data() {
		return {
			
		}
	},
	
	methods:{
		ToSearchPage() {
			uni.navigateTo({
				url:"../search/search"
			})
		}
	}
}
</script>

<style>
.search-containier {
	display: flex;
	justify-content: space-between;
	height: 70rpx;
	align-items: center;
	background: linear-gradient(to top, #ffe566 10%, #ffd300 100%);
	padding: 30rpx 0;
}
.search-code-image {
	width: 50rpx;
	height: 50rpx;
}
.search-code {
	padding: 0 15rpx;
	width: 50rpx;
	height: 50rpx;
}
.search-img {
	margin: auto 0 auto 20rpx;
	width: 40rpx;
	height: 40rpx;
}
.search {
	height: 70rpx;
	line-height: 70rpx;
	width: 80%;
	display: flex;
	flex-direction: flex;
	background: #fff7d4;
	border-top-left-radius: 50rpx;
	border-bottom-left-radius: 50rpx;
	border-bottom-right-radius: 50rpx;
}
.search-input {
	height: 70rpx;
	line-height: 70rpx;
	width: 100%;
	font-size: 30rpx;
	color: #666666;
}
/* 轮播样式 */
.imageurl {
	width: 100%; 
	height: 300rpx !important;
}
.swiper-container {
	height: 300rpx !important;
}
.swiper-item {
	width: 100%;
	height: 300rpx !important;
}
</style>
