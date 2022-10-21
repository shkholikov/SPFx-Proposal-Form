import * as React from "react";
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";

export default class Proposal extends React.Component {
	public render(): React.ReactElement {
		return (
			<div>
				<Box sx={{ flexGrow: 1 }}>
					<Typography variant="h2" align="center" gutterBottom>
						ITT - IThink Tech
					</Typography>
					<Grid container spacing={4} justifyContent="center" alignItems="center">
						<Typography variant="h5" gutterBottom>
							Online Proposal
						</Typography>
						<Typography variant="subtitle1" align="center" gutterBottom>
							Do you have a project, program, or activity you think our orgarization should take on? Please fill out the following form to describe
							your proposal. We will review the information and get back to you. If you have additional information to provide, please contact us
							directly.
						</Typography>
						<Grid item xs={12} sm={6} md={6}>
							<TextField label="Name" variant="outlined" fullWidth />
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<TextField label="Surname" variant="outlined" fullWidth />
						</Grid>
						<Grid item xs={12} sm={12} md={12}>
							<TextField type="email" label="Email Address" variant="outlined" fullWidth />
						</Grid>
						<Grid item xs={12} sm={12} md={12}>
							<TextField type="number" label="Number" variant="outlined" fullWidth defaultValue={"+"} />
						</Grid>
						<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
							<TextField label="Description" variant="outlined" fullWidth multiline rows={4} helperText="Please describe your proposal" />
						</Grid>
						<Button variant="outlined" size="large">
							Submit
						</Button>
					</Grid>
				</Box>
			</div>
		);
	}
}
