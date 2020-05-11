import React from 'react';
import {Grid, Placeholder} from 'semantic-ui-react';

export const placeholderRestaurants = () => (
    <React.Fragment>
            <Grid.Column>
                <div className='restaurant-item' style={{paddingBottom: '20px'}}>
                    <Placeholder>
                        <Placeholder.Image rectangular />
                            <Placeholder.Header >
                                <div style={{paddingLeft: 15}}>
                                    <Placeholder.Line />
                                </div>
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Header>
                    </Placeholder>
                </div>
            </Grid.Column>
            <Grid.Column>
                <div className='restaurant-item' style={{paddingBottom: '20px'}}>
                    <Placeholder>
                        <Placeholder.Image rectangular />
                            <Placeholder.Header >
                                <div style={{paddingLeft: 15}}>
                                    <Placeholder.Line />
                                </div>
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Header>
                    </Placeholder>
                </div>
            </Grid.Column>
            <Grid.Column>
                <div className='restaurant-item' style={{paddingBottom: '20px'}}>
                    <Placeholder>
                        <Placeholder.Image rectangular />
                            <Placeholder.Header >
                                <div style={{paddingLeft: 15}}>
                                    <Placeholder.Line />
                                </div>
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Header>
                    </Placeholder>
                </div>
            </Grid.Column>
    </React.Fragment>
);