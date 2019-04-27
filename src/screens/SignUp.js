import React, {Component} from 'react';
import {
    Image,
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Constant from '../helper/constant';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import {isEmail, isAlpha, isPhoneNo} from '../screens/validator';

export default class Login extends Component {
    constructor(props) {
        debugger
        super(props);
        this.state = {
            fname: '',
            lName: '',
            uName: '',
            password: '',
            dob: '',
            gender: 0,
            isErr: false,
            isShowDate: false,

        };
        this.radio_props = [
            {label: 'Female', value: 0},
            {label: 'Male', value: 1}
        ];
    }

    hidePicker = () => {
        this.setState({isShowDate: false});
    };

    handleDate = date => {
        // console.warn("A date has been picked: " + typeof (date), date);
        this.setState({dob: moment(date).format('DD-MMM-YYYY')});
        this.hidePicker();
    };
    showPicker = () => {
        this.setState({isShowDate: true});
    };
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

    onSignUpClick = () => {
        debugger;
        let navigation = this.props.navigation;
        const {fName, lName, uName, password, dob, isErr} = this.state;

        if (fName === '' || lName === '' || uName === '' || password === '' || dob === '') {
            debugger;
            alert('Please enter all details..');
        } else if (!isAlpha.test(fName)) {
            alert("Enter valid first name")
        } else if (!isAlpha.test(lName)) {
            alert("Enter valid last name")
        } else if (isErr) {
            alert('write Email or Phone no properly..');

        } else {
            debugger
            fetch('http://localhost:3010/user', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fName: this.state.fName,
                    lName: this.state.lName,
                    uName: this.state.uName,
                    password: this.state.password,
                    dob: this.state.dob,
                    gender: this.state.gender,

                })
            }).then(function (response) {
                return response.json();
            }).then(function (result) {
                // console.log(result);
                if (!result.error) {
                    Alert.alert("User register successfully,...");
                    navigation.navigate('Login');


                } else {
                    Alert.alert(result.error_msg);
                    console.log(result);
                }
            }).catch(function (error) {
                console.log("-------- error ------- " + error);
                alert("result:" + error)
            });

        }
    }

    render() {
        const {isShowDate, dob, fName} = this.state;
        return (
            <View style={styles.mainContainer}>
                <View>
                    <Text style={styles.txt}>Create a new Account</Text>
                    <Text style={styles.sTxt}>It's free and always will be.</Text>
                </View>
                <View style={styles.nameContainer}>
                    <View style={[styles.input, {width: wp('42%')}]}>
                        <TextInput style={styles.inputTxt}
                                   placeholder={'First Name'}
                                   placeholderTextColor={Constant.color.placeholderColor}
                                   onChangeText={(fname) => {
                                       this.setState({fName: fname})
                                   }}

                        />
                    </View>
                    <View style={[styles.input, {width: wp('42%'), marginLeft: wp('4%')}]}>
                        <TextInput style={styles.inputTxt}
                                   placeholder={'Surname'}
                                   placeholderTextColor={Constant.color.placeholderColor}
                                   onChangeText={(sname) => {
                                       this.setState({lName: sname})
                                   }}


                        />
                    </View>


                </View>
                <View style={styles.input}>
                    <TextInput style={styles.inputTxt}
                               placeholder={'Mobile number or email Address'}
                               placeholderTextColor={Constant.color.placeholderColor}
                               onChangeText={(uname) => {
                                   this.setState({uName: uname})
                               }}
                               onBlur={(e) => this.checkUname(e.nativeEvent.text)}

                    />
                </View>
                <View style={styles.input}>

                    <TextInput style={styles.inputTxt}
                               placeholder={' New Password'}
                               secureTextEntry={true}
                               placeholderTextColor={Constant.color.placeholderColor}
                               placeholderTextWeight={'bold'}
                               onChangeText={(pass) => {
                                   this.setState({password: pass})
                               }}
                    />

                </View>
                <View style={styles.bday}>
                    <Text style={styles.inputTxt}>Birthday</Text>
                </View>
                <TouchableOpacity style={styles.input} onPress={this.showPicker}>
                    <View>{
                        this.state.dob === ''
                            ?
                            <Text style={[styles.inputTxt, {color: Constant.color.placeholderColor}]}>Select date of
                                birth.</Text>
                            :
                            <Text style={styles.inputTxt}>{dob}</Text>
                    }
                    </View>

                </TouchableOpacity>
                <DateTimePicker
                    isVisible={isShowDate}
                    onConfirm={this.handleDate}
                    onCancel={this.hidePicker}
                />

                <View style={styles.nameContainer}>
                    <View style={{marginLeft: wp('2%'), marginTop: hp('3%')}}>
                        <RadioForm
                            radio_props={this.radio_props}
                            initial={0}
                            formHorizontal={true}
                            labelHorizontal={true}
                            buttonColor={'#2196f3'}
                            animation={true}
                            buttonOuterColor={'#9E9E9E'}
                            onPress={(value) => {
                                // this.setState({gender: value}, ()=>{alert(this.state.gender)} );
                                this.setState({gender: value});
                            }}
                        />
                    </View>
                </View>
                <View style={{width: wp('75%'), marginTop: hp('4%')}}>

                    <Text style={styles.Txt1}>By clicking Sign Up,you agree to our Terms,
                        Data Policy and Cookie Policy.You may receive SMS notifications from us and can opt out any
                        time.</Text>

                </View>

                <View style={styles.btnTxt}>
                    <TouchableOpacity onPress={this.onSignUpClick}>
                        <Text style={styles.btnTxt1}>Sign Up</Text>
                    </TouchableOpacity>
                </View>


            </View>
        );
    }

}
const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Constant.color.signUpColor,
        paddingTop: Constant.isIOS ? 10 : 0,
        flex: 1,
        flexDirection: 'column',
        paddingRight: wp('6%'),
        paddingLeft: wp('6%'),
    },
    input: {
        height: hp('6%'),
        backgroundColor: Constant.color.white,
        borderRadius: 4,
        paddingLeft: wp('3%'),
        justifyContent: 'center',
        marginTop: hp('2%'),
        borderWidth: 2,
        borderColor: '#BDC7D8',
    },
    inputTxt: {
        fontSize: 20,
    },
    sTxt: {
        fontSize: 20,
        paddingLeft: wp('2%'),
        marginTop: wp('3%'),
        marginBottom: wp('3%'),
        color: '#4B4F56',
    },
    btnTxt: {
        width: wp('42%'),
        height: hp('6%'),
        backgroundColor: '#5C9449',
        borderRadius: 4,
        paddingLeft: wp('3%'),
        justifyContent: 'center',
        marginTop: hp('2%'),
    },
    btnTxt1: {
        fontSize: 26,
        fontWeight: 'bold',
        color: Constant.color.white,
        alignSelf: 'center',
    },
    Txt1: {
        fontSize: 14,
        color: Constant.color.placeholderColor,
    },
    txt: {
        alignSelf: 'center',
        fontSize: 32,
        fontWeight: 'bold',
    },
    nameContainer: {
        flexDirection: 'row',

    },
    bday: {
        marginTop: hp('2%'),
        paddingLeft: wp('3%'),
    }
})