import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

module.exports = {
    screenWidth: width,
    screenHeight: (Platform.OS) === 'ios' ? height - 24 : height,
    fullScreenHeight:height,
    isIOS: Platform.OS === "ios",
    isANDROID: Platform.OS === 'android',
    screen:Dimensions.get('window'),
    color:{
        themeColor:'#3B58A0',
        white:'#ffffff',
        placeholderColor:'#999999',
        btnColor:'#223B73',
        signUpColor:'#EBEDF0',



    }


}
