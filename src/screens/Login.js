import React, {Component} from 'react';
import {
    Image,
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity, Alert,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Constant from '../helper/constant';
import {isAlpha,isEmail,isPhoneNo} from "./validator";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            uName:'',
            password:'',
            isErr:false,
        }

    }

    onSignUpClick=()=>{
        this.props.navigation.navigate('SignUp')

    }
    checkUname = (text) => {
        debugger
        if (isNaN(text)) {
            if (!isEmail.test(text)) {
                debugger
                alert('wrong Email');
                this.setState({isErr: true})
            } else {
                this.setState({isErr: false})
            }
        } else {
            debugger
            if (!isPhoneNo.test(text)) {
                debugger
                alert('Enter valid MobileNo....');
                this.setState({isErr: true})
            } else {
                this.setState({isErr: false})
            }
        }
    };
    onLoginClick = () => {
        debugger;
        let navigation = this.props.navigation;
        const { uName, password,isErr } = this.state;

        if ( uName === '' || password === '' ) {
            debugger;
            alert('Please enter Email Id or Password..');
        } else if (isErr) {
            alert('write Email or Phone no properly..');

        } else {
            debugger
            fetch('http://localhost:3010/user/Login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uName: this.state.uName,
                    password: this.state.password,

                })
            }).then(function (response) {
                return response.json();
            }).then(function (res) {
                // console.log(result);
                if (res.success===true) {
                    Alert.alert("User register successfully,...");
                   // navigation.navigate('Login');


                } else {
                    Alert.alert(res.message);

                }
            }).catch(function (error) {
                console.log("-------- error ------- " + error);
                alert("result:" + error)
            });

        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
               <View style={styles.subContent}>
                    {/*<Image source={{uri:'facebook'}} style={{height:250, width:250 }} resizeMode={'contain'}/>*/}
                   <Text style={styles.fbTxt}>facebook</Text>
               </View>
                <View style={styles.input}>
                    <TextInput style={styles.inputTxt}
                               placeholder={' Email or PhoneNo'}
                               placeholderTextColor={Constant.color.placeholderColor}
                               onChangeText={(uname)=>{
                                   this.setState({uName:uname})
                               }}
                               onBlur={(e)=>this.checkUname(e.nativeEvent.text)}
                    />
                </View>
                <View style={styles.input}>
                    <TextInput style={styles.inputTxt}
                               placeholder={' Password'}
                               placeholderTextColor={Constant.color.placeholderColor}
                               secureTextEntry={true}
                               onChangeText={(pass)=>{
                                   this.setState({password:pass})
                               }}
                    />
                </View>
                <View style={[styles.input,{backgroundColor:Constant.color.btnColor}]}>
                    <TouchableOpacity onPress={this.onLoginClick}>
                        <Text style={styles.btnTxt}>Log In</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.lView}>
                    <TouchableOpacity  onPress={this.onSignUpClick}>
                    <Text style={styles.txt}>Sign Up for Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={[styles.btnTxt,{backgroundColor:Constant.color.btnColor}]}>?</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

}
const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor:Constant.color.themeColor,
        paddingTop: Constant.isIOS ? 10 : 0,
        flex:1,
        flexDirection:'column',
        paddingRight:wp('6%'),
        paddingLeft:wp('6%'),
    },
    subContent: {
        height:hp('35%'),
        justifyContent:'center',
        alignItems:'center',
       // backgroundColor: 'pink',
    },
    input:{
        height:hp('6%'),
        backgroundColor:Constant.color.white,
        borderRadius:4,
        paddingLeft: wp('3%'),
        justifyContent: 'center',
        marginTop:hp('3%'),
    },
    inputTxt:{
        fontSize:20,
    },
    btnTxt:{
        fontSize:26,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: Constant.color.white,
    },
    txt:{
        textDecorationLine: 'underline',
        alignSelf: 'center',
        color:Constant.color.white,
        fontSize:20,
        fontWeight: 'bold',
    },
    lView:{
        flex:1,
        justifyContent:'flex-end',
       // backgroundColor:'yellow',
        paddingBottom:Constant.isIOS?20:0,
    },
    fbTxt:{
        fontSize:60,
        color:Constant.color.white,
        alignSelf:'center',
        fontWeight:'bold',
    }
})