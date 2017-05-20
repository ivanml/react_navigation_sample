import React from 'react';
import {
  AppRegistry,
  Button,
  Text,
  View,
} from 'react-native';
import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation';

class ChatScreen extends React.Component {
  // Nav options can be defined as a function of the screen's props:
  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    const isInfo = state.params.mode === 'info';
    const {user} = state.params;
    return {
      title: isInfo ? `${user}'s Contact Info` : `Chat with ${state.params.user}`,
      headerRight: (
        <Button
          title={isInfo ? 'Done' : `${user}'s info`}
          onPress={() => setParams({ mode: isInfo ? 'none' : 'info'})}
        />
      ),
    };
  };

  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    var cur_user = this.props.navigation.state.params.user;
    var is_info_page = this.props.navigation.state.params.mode === 'info';
    return (
      <View>
        {is_info_page ?
        <Text>{cur_user + `'s Contact Info`}</Text> :
        <Text>{`Chat with ` + cur_user}</Text>}
      </View>
    );
  }
}

class RecentChatsScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>List of recent chats</Text>
        <Button
          onPress={() => navigate('Chat', { user: 'Lily' })}
          title="Chat with"
        />
      </View>
    );
  }
}

class AllContactsScreen extends React.Component {
  render() {
    return <Text>List of all contacts</Text>
  }
}

const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
});
MainScreenNavigator.navigationOptions = {
  title: 'My Chats',
};

const SimpleApp = StackNavigator({
  Home: { screen: MainScreenNavigator },
  Chat: { screen: ChatScreen },
});

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
