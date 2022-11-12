import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

import * as strings from "ProposalWebPartStrings";
import Proposal from "./components/Proposal";
import { IProposalProps } from "./components/IProposalProps";

export interface IProposalWebPartProps {
	description: string;
}

export default class ProposalWebPart extends BaseClientSideWebPart<IProposalWebPartProps> {
	private _isDarkTheme: boolean = false;
	private _environmentMessage: string = "";
	private _config: any;

	public render(): void {
		const element: React.ReactElement<IProposalProps> = React.createElement(Proposal, {
			context: this.context
			// description: this.properties.description,
			// isDarkTheme: this._isDarkTheme,
			// environmentMessage: this._environmentMessage,
			// hasTeamsContext: !!this.context.sdks.microsoftTeams,
			// userDisplayName: this.context.pageContext.user.displayName
		});

		ReactDom.render(element, this.domElement);
	}

	protected async onInit(): Promise<void> {
		this._config = await this.getConfigurationFile();
		this._environmentMessage = this._getEnvironmentMessage();
		if (this._config) {
			document.title = this._config.webPageTitle;
			const link: HTMLElement = (document.querySelector("link[rel*='icon']") as HTMLElement) || (document.createElement("link") as HTMLElement);
			link.setAttribute("type", "image/x-icon");
			link.setAttribute("rel", "shortcut icon");
			link.setAttribute("href", this.context.pageContext.site.absoluteUrl + this._config.faviconRelativeUrl);
			document.getElementsByTagName("head")[0].appendChild(link);
		}

		const spAppBar: any = document.getElementById("sp-appBar");
		const spLeftNav: any = document.getElementById("spLeftNav");
		const spSiteHeader: any = document.getElementById("spSiteHeader");
		const spCommandBar: any = document.getElementById("spCommandBar");

		if (spAppBar && spLeftNav && spLeftNav && spCommandBar) {
			spAppBar.style = spLeftNav.style = spSiteHeader.style = spCommandBar.style = "display:none";
		}
		return super.onInit();
	}

	private getConfigurationFile(): Promise<any> {
		return this.context.spHttpClient
			.get(
				`${this.context.pageContext.web.absoluteUrl}/_api/web/GetFolderByServerRelativeUrl('config')/Files('config.json')/$value`,
				SPHttpClient.configurations.v1
			)
			.then((response: any) => {
				return response.json();
			})
			.then((json) => {
				return json;
			})
			.catch((err: Error) => {
				console.error("Error occurred during loading config file: " + err);
			});
	}

	private _getEnvironmentMessage(): string {
		if (!!this.context.sdks.microsoftTeams) {
			// running in Teams
			return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
		}

		return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
	}

	protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
		if (!currentTheme) {
			return;
		}

		this._isDarkTheme = !!currentTheme.isInverted;
		const { semanticColors } = currentTheme;

		if (semanticColors) {
			this.domElement.style.setProperty("--bodyText", semanticColors.bodyText || null);
			this.domElement.style.setProperty("--link", semanticColors.link || null);
			this.domElement.style.setProperty("--linkHovered", semanticColors.linkHovered || null);
		}
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField("description", {
									label: strings.DescriptionFieldLabel
								})
							]
						}
					]
				}
			]
		};
	}
}
