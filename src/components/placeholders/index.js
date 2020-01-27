import React from 'react';
import {Grid, Placeholder} from 'semantic-ui-react';

export const placeholderRestaurants = () => (
    <React.Fragment>
                <Grid.Column>
                <Placeholder>
                        <Placeholder.Image rectangular />
                        <Placeholder.Header>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        </Placeholder.Header>
                    </Placeholder>
            </Grid.Column>
            <Grid.Column>
                <Placeholder>
                        <Placeholder.Image rectangular />
                        <Placeholder.Header>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        </Placeholder.Header>
                    </Placeholder>
            </Grid.Column>
            <Grid.Column>
                <Placeholder>
                        <Placeholder.Image rectangular />
                        <Placeholder.Header>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        </Placeholder.Header>
                    </Placeholder>
            </Grid.Column>
    </React.Fragment>
);
