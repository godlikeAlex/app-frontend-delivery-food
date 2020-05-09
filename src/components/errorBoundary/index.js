import React from 'react';
import ErrorImg from './error.png';
import { Container, Grid, Button, Image } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
          this.resetError();
        }
      }


    // componentDidCatch() {
    //   logErrorToMyService(error, errorInfo);
    // }

    resetError = () => {
        this.props.setError(false);
        this.setState({ hasError: false })
    }

  
    render() {
      if (this.state.hasError || this.props.hasError) {
        return (
            <Container style={{textAlign: 'center', marginTop: '25px'}}>
                <Grid centered>
                    <Grid.Column computer={12} mobile={16} style={{textAlign: 'center'}}>
                        <Image style={{width: '65%', margin: 'auto'}} src={ErrorImg} />
                        <h1>Упс... Ошибочка</h1>
                        <h5>Проверьте соеденение интернета или просто перезагрузите станицу.</h5>
                        <Button color='orange' style={{margin: 'auto'}} onClick={this.resetError}>
                            Попробовать снова
                        </Button>
                    </Grid.Column>
                </Grid>
            </Container>
        )
      }
  
      return this.props.children; 
    }
}

const mapStateToProps = ({hasError}) => {
    return {
        hasError
    }
};
const mapDispatchToProps = dispatch => {
    const { setError } = bindActionCreators(actions, dispatch);

    return {
        setError: error => setError(error)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary)