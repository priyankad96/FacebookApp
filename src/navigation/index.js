import { createStackNavigator, createAppContainer } from 'react-navigation';
import Constant from '../helper/constant';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
// import uploadImage from '../screens/uploadImage';
// import Gallery from '../screens/Gallery1';
// import forgetPass from '../screens/forgetPassword';


const AppNavigator = createStackNavigator({

        Login:{
            screen:Login,
            navigationOptions:{
                header:null
            }
        },
        SignUp:{
            screen:SignUp,
            navigationOptions:{

                headerStyle: {
                    backgroundColor: Constant.color.themeColor
                },
                headerTitleStyle: {
                    fontWeight: "bold",
                    color: Constant.color.white,
                    fontSize:30,
                },
                headerTintColor: Constant.color.white,
                headerTitle:'Sign Up',
            }
        }
    },
    {

    });
const NavigationContainer = createAppContainer(AppNavigator)
export default NavigationContainer;