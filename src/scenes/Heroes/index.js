import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchHeroes } from '../../store/heroes/actions';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight
} from 'react-native';

import HeroCard from './components/HeroCard';
import Loading from '../../components/Loading';

class Heroes extends Component {
  componentDidMount() {
    this.props.fetchHeroes()
  }

  render() {
    const { data, loading, error } = this.props.heroes

    return (
      <View style={styles.container}>
        {
          loading ? <Loading /> :
          error.status ? <Text>Oops, something wrong</Text> :
          <FlatList
            numColumns={3}
            data={data}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => 
              <TouchableHighlight onPress={() => {
                this.props.navigation.navigate('HeroDetails', {hero: item})
              }}>
                <HeroCard hero={item} />
              </TouchableHighlight>
            }
          />
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  heroes: state.heroes
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchHeroes
}, dispatch)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37474F',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Heroes);