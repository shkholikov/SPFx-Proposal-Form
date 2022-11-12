import sprLib from "sprestlib";

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const sprLib = require("sprestlib");

export default class Helper {
	static getUserInfo(component: any): void {
		return sprLib
			.user({ baseUrl: "https://ittuz.sharepoint.com/sites/IThinkTech/" })
			.info()
			.then((objUser: any) => {
				if (objUser) {
					component.setState({ userInfo: objUser });
					console.log("getUserInfo");
				}
			})
			.catch((err: Error) => {
				console.error("Error getUserInfo: " + err);
			});
	}

	static getUserGroups(): void {
		return sprLib
			.user({ baseUrl: "https://ittuz.sharepoint.com/sites/IThinkTech/" })
			.groups()
			.then((objUser: any) => {
				if (objUser) {
					console.log("getUserGroups");
				}
			})
			.catch((err: Error) => {
				console.error("Error getUserGroups: " + err);
			});
	}

	static getUserProfile(): void {
		return sprLib
			.user({ baseUrl: "https://ittuz.sharepoint.com/sites/IThinkTech/" })
			.profile()
			.then((objUser: any) => {
				if (objUser) {
					console.log("getUserProfile");
				}
			})
			.catch((err: Error) => {
				console.error("Error getUserProfile: " + err);
			});
	}
	static getSiteInfo(): void {
		return sprLib
			.site("https://ittuz.sharepoint.com/sites/IThinkTech/")
			.info()
			.then((objUser: any) => {
				if (objUser) {
					console.log("getSiteInfo");
				}
			})
			.catch((err: Error) => {
				console.error("Error getSiteInfo: " + err);
			});
	}
}
