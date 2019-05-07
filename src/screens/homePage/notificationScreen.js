import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView, Image,
} from 'react-native';
import Constant from '../../helper/constant';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class NotificationScreen extends Component{
    render(){
        return(

            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.request}>
                        <Text style={styles.txt}>
                            {'Earlier'}
                        </Text>
                    </View>
                    <View style={styles.search}>
                        <View style={styles.pic}>
                            <Image source={{uri: 'i6'}} style={styles.pic} resizeMode={'cover'}
                                      overflow={'hidden'}/>
                            <Text>hi</Text>
                        </View>

                    </View>
                </View>

                {/*

                    <View style={styles.pic}>
                        pic<Image source={{uri: 'i6'}} style={styles.pic} resizeMode={'cover'}
                               overflow={'hidden'}/>
                    </View>
                    <View style={styles.input1}>
                        <Text style={styles.inputTxt1}>
                            <Text style={{fontWeight: 'bold'}}>{'Parul Patel'}</Text>
                            <Text>{'  Shared a Post.'}</Text>
                        </Text>
                        <Text>memory</Text>
                    </View>
                    <View style={styles.dot}>
                        <Icon name="ellipsis-h" size={25}/>
                    </View>
                */}
            </SafeAreaView>

        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        //justifyContent:'center',
        backgroundColor:'orange',
    },
    content:{
        marginLeft:wp('3%'),
        marginRight:wp('3%'),
        backgroundColor:'blue',
        flex:1,
        flexDirection: 'column',
    },
    request:{
        height:hp('5%'),
        backgroundColor: 'white',
        justifyContent:'center',
        borderBottomColor:'grey',
        borderBottomWidth:0.2,
    },
    txt:{
        fontWeight: 'bold',
        fontSize:Constant.fontSize.large
    },
    search: {
        height: hp('14%'),
        backgroundColor: 'pink',
        flexDirection: 'row',
        marginBottom:hp('2%'),
        //justifyContent: 'center',
    },
    pic: {
        height:hp('14%'),
        width: hp('14%'),
        borderRadius: hp('7%'),
        backgroundColor:'yellow',
    },
    inputTxt1: {
        fontSize: Constant.fontSize.small,
    },
    input1: {
        height: hp('12%'),
        width: wp('70%'),
        // justifyContent:'center',
        //backgroundColor:'blue',
    },
    dot:{
        height: hp('12%'),
        width: wp('14%'),
        // justifyContent:'center',
       // backgroundColor:'yellow',

    }
})