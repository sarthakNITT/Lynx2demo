
import {observer} from 'mobx-react';
import React, {useRef, useState} from 'react';
import {Dimensions, Keyboard, ScrollView, View, Platform} from 'react-native';
import {TextInput} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import Error from '../../components/Error';
import {DEPARTMENT_STORE} from '../../mobx/DEPARTMENT_STORE';
import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';
import * as colors from '../../utils/colors';
import {containOnlyNumbers} from '../../utils/helperFunction/FormValidation';
import {
  COUNTRIES,
  COUNTRY_DATA,
  Gender,
  DEPARTMENTS,
  MODAL_TYPE_CODE,
  MODAL_TYPE_DEPARTMENT,
  MODAL_TYPE_GENDER,
  MODAL_TYPE_NATIONALITY,
} from '../../utils/MODAL_DATABASE';
import DropDownModal from './DropDownModal';
import NextButton from './nextButton';
import Text from '../../components/TextComponent';

const WIDTH = Dimensions.get('window').width;

const Name = observer(({forwardAction}) => {
  const [er, setEr] = useState(false);
  const [erMsg, setErMsg] = useState('');
  const [modalType, setmodalType] = useState(false);
  const [data, setData] = useState([]);
  const scroll = () => {
    var fname = STUDENT_REGISTRATION_STORE.getFirstName;
    STUDENT_REGISTRATION_STORE.setFirstName(fname.trim());

    if (!STUDENT_REGISTRATION_STORE.getFirstName) {
      setEr(true);
      setErMsg('Enter a valid name');
      return;
    }
    if (STUDENT_REGISTRATION_STORE.getDepartment == 'Department') {
      setEr(true);
      setErMsg('Select your Department');
      return;
    }

    if (
      !STUDENT_REGISTRATION_STORE.getMobileNumber ||
      !containOnlyNumbers(STUDENT_REGISTRATION_STORE.getMobileNumber)
    ) {
      setEr(true);
      setErMsg('Enter a valid Mobile Number');
      return;
    }

    if (STUDENT_REGISTRATION_STORE.getGender === 'Gender') {
      setEr(true);
      setErMsg('Select Your Gender');
      return;
    }

    if (!STUDENT_REGISTRATION_STORE.getNationality) {
      setEr(true);
      setErMsg('Select your Nationality');
      return;
    }

    setEr(false);

    forwardAction();
  };

  const lastNameInput = useRef(); // for focus transfer

  const mobileInput = useRef();

  return (
    <ScrollView
      style={styles.scrollView}
      onScroll={() => {
        Keyboard.dismiss();
      }}
      scrollEventThrottle={10}
      showsVerticalScrollIndicator={false}>
      <DropDownModal modalType={modalType} data={data} />
      <Text style={styles.header}>Registration</Text>
      <Text style={styles.title}>Basic Information</Text>
      <Text style={styles.subtitle}>{'Enter basic profile information'}</Text>
      <View style={{paddingHorizontal: scale(20), zIndex: 1}}>
        
        <TextInput
          label="First Name"
          mode="outlined"
          //disabled={true}
          theme={{
            colors: {
            primary: er ? colors.Tertiary : 'black',
             },
          }}
          value={STUDENT_REGISTRATION_STORE.getFirstName}
          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
          outlineColor={er ? colors.Tertiary : null}
          style={styles.input}
          onChangeText={fname => {
             STUDENT_REGISTRATION_STORE.setFirstName(fname);
          }}
          returnKeyType="next"
          onSubmitEditing={() => lastNameInput.current.focus()}
          />

        {Platform.OS === 'ios' ? (
          <TouchableOpacity
            style={{marginTop: verticalScale(5)}}
            onPress={() => {
              setmodalType(MODAL_TYPE_DEPARTMENT);
              setData(DEPARTMENT_STORE.getRemainingDepartment);
              STUDENT_REGISTRATION_STORE.toggleModalVisible();
            }}
            disabled={DEPARTMENT_STORE.getDepartmentFound}>
            <Text
              mode="outlined"
              disabled={true}
              style={{
                padding: scale(15),
                fontSize: scale(14),
                borderRadius: scale(5),
                borderWidth: scale(1),
                borderColor: '#bdbdbd',
                backgroundColor: '#f6f6f6',
                color: '#727272',
                marginTop: scale(12),
                paddingBottom: scale(19),
                paddingTop: scale(18),
              }}
              theme={{
                colors: {
                  primary: er ? colors.Tertiary : 'black',
                },
              }}
              selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
              outlineColor={er ? colors.Tertiary : null}
              selection={{start: 0}}>
              {STUDENT_REGISTRATION_STORE.getDepartment}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{marginTop: verticalScale(5)}}
            onPress={() => {
              setmodalType(MODAL_TYPE_DEPARTMENT);
              setData(DEPARTMENT_STORE.getRemainingDepartment);
              STUDENT_REGISTRATION_STORE.toggleModalVisible();
            }}
            disabled={DEPARTMENT_STORE.getDepartmentFound}>
            <TextInput
              mode="outlined"
              disabled={true}
              theme={{
                colors: {
                  primary: er ? colors.Tertiary : 'black',
                },
              }}
              selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
              outlineColor={er ? colors.Tertiary : null}
              selection={{start: 0}}>
              {STUDENT_REGISTRATION_STORE.getDepartment}
            </TextInput>
          </TouchableOpacity>
        )}
         {Platform.OS === 'ios' ? (
          <TouchableOpacity
            style={{marginTop: verticalScale(8), zIndex: 1}}
            onPress={() => {
              setmodalType(MODAL_TYPE_DEPARTMENT);
              setData(DEPARTMENT_STORE.getRemainingDepartment);
              STUDENT_REGISTRATION_STORE.toggleModalVisible();
            }}
            disabled={DEPARTMENT_STORE.getDepartmentFound}
          >
            <Text
              mode="outlined"
              disabled={true}
              style={{
                paddingHorizontal: scale(15),
                fontSize: scale(14),
                borderRadius: scale(5),
                borderWidth: scale(1),
                borderColor: '#bdbdbd',
                backgroundColor: '#f6f6f6',
                padding: scale(20),
                color: '#727272',
              }}
              theme={{
                colors: {
                  primary: er ? colors.Tertiary : 'black',
                },
              }}
              selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
              outlineColor={er ? colors.Tertiary : null}>
              Country of origin:{' '}
              {STUDENT_REGISTRATION_STORE.getDepartment.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{marginTop: verticalScale(5)}}
            onPress={() => {
              setmodalType(MODAL_TYPE_DEPARTMENT);
              setData(DEPARTMENTS);
              STUDENT_REGISTRATION_STORE.toggleModalVisible();
            }}>
            <TextInput
              mode="outlined"
              disabled={true}
              theme={{
                colors: {
                  primary: er ? colors.Tertiary : 'black',
                },
              }}
              selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
              outlineColor={er ? colors.Tertiary : null}>
              Department:{' '}
              {STUDENT_REGISTRATION_STORE.getDepartment}
            </TextInput>
          </TouchableOpacity>
        )}


        <View style={{flexDirection: 'row'}}>
          {Platform.OS === 'ios' ? (
            <TouchableOpacity
              style={{marginTop: verticalScale(0)}}
              onPress={() => {
                setmodalType(MODAL_TYPE_CODE);
                setData(COUNTRY_DATA);
                STUDENT_REGISTRATION_STORE.toggleModalVisible();
              }}>
              <Text
                mode="outlined"
                disabled={true}
                style={{
                  padding: scale(15),
                  fontSize: scale(14),
                  borderRadius: scale(5),
                  borderWidth: scale(1),
                  borderColor: '#bdbdbd',
                  backgroundColor: '#f6f6f6',
                  color: '#727272',
                  marginTop: scale(12),
                  paddingBottom: scale(19),
                  paddingTop: scale(18),
                }}
                theme={{
                  colors: {
                    primary: er ? colors.Tertiary : 'black',
                  },
                }}
                selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
                outlineColor={er ? colors.Tertiary : null}>
                +{''}
                {STUDENT_REGISTRATION_STORE.getCountryCode}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{marginTop: verticalScale(5)}}
              onPress={() => {
                setmodalType(MODAL_TYPE_CODE);
                setData(COUNTRY_DATA);
                STUDENT_REGISTRATION_STORE.toggleModalVisible();
              }}>
              <TextInput
                mode="outlined"
                disabled={true}
                theme={{
                  colors: {
                    primary: er ? colors.Tertiary : 'black',
                  },
                }}
                selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
                outlineColor={er ? colors.Tertiary : null}>
                +{''}
                {STUDENT_REGISTRATION_STORE.getCountryCode}
              </TextInput>
            </TouchableOpacity>
          )}

          <TextInput
            label="Mobile Number"
            mode="outlined"
            //disabled={true}
            maxLength={15}
            keyboardType="phone-pad"
            theme={{
              colors: {
                primary: er ? colors.Tertiary : 'black',
              },
            }}
            outlineColor={er ? colors.Tertiary : null}
            style={{
              flex: 1,
              marginLeft: scale(5),
              marginTop: verticalScale(5),
            }}
            value={STUDENT_REGISTRATION_STORE.getMobileNumber}
            onChangeText={val => {
              STUDENT_REGISTRATION_STORE.setMobileNumber(val);
            }}
            ref={mobileInput}
            returnKeyType="next"
          />
        </View>
        {Platform.OS === 'ios' ? (
          <TouchableOpacity
            style={{marginTop: verticalScale(8)}}
            onPress={() => {
              setmodalType(MODAL_TYPE_GENDER);
              setData(Gender);
              STUDENT_REGISTRATION_STORE.toggleModalVisible();
            }}>
            <Text
              mode="outlined"
              disabled={true}
              style={{
                paddingHorizontal: scale(15),
                fontSize: scale(14),
                borderRadius: scale(5),
                borderWidth: scale(1),
                borderColor: '#bdbdbd',
                backgroundColor: '#f6f6f6',
                padding: scale(20),
                color: '#727272',
              }}
              theme={{
                colors: {
                  primary: er ? colors.Tertiary : 'black',
                },
              }}
              selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
              outlineColor={er ? colors.Tertiary : null}>
              {STUDENT_REGISTRATION_STORE.getGender.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{marginTop: verticalScale(5)}}
            onPress={() => {
              setmodalType(MODAL_TYPE_GENDER);
              setData(Gender);
              STUDENT_REGISTRATION_STORE.toggleModalVisible();
            }}>
            <TextInput
              mode="outlined"
              disabled={true}
              theme={{
                colors: {
                  primary: er ? colors.Tertiary : 'black',
                },
              }}
              selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
              outlineColor={er ? colors.Tertiary : null}>
              {STUDENT_REGISTRATION_STORE.getGender.toUpperCase()}
            </TextInput>
          </TouchableOpacity>
        )}

        {Platform.OS === 'ios' ? (
          <TouchableOpacity
            style={{marginTop: verticalScale(8), zIndex: 1}}
            onPress={() => {
              setmodalType(MODAL_TYPE_NATIONALITY);
              setData(COUNTRIES);
              STUDENT_REGISTRATION_STORE.toggleModalVisible();
            }}>
            <Text
              mode="outlined"
              disabled={true}
              style={{
                paddingHorizontal: scale(15),
                fontSize: scale(14),
                borderRadius: scale(5),
                borderWidth: scale(1),
                borderColor: '#bdbdbd',
                backgroundColor: '#f6f6f6',
                padding: scale(20),
                color: '#727272',
              }}
              theme={{
                colors: {
                  primary: er ? colors.Tertiary : 'black',
                },
              }}
              selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
              outlineColor={er ? colors.Tertiary : null}>
              Country of origin:{' '}
              {STUDENT_REGISTRATION_STORE.getNationality.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{marginTop: verticalScale(5)}}
            onPress={() => {
              setmodalType(MODAL_TYPE_NATIONALITY);
              setData(COUNTRIES);
              STUDENT_REGISTRATION_STORE.toggleModalVisible();
            }}>
            <TextInput
              mode="outlined"
              disabled={true}
              theme={{
                colors: {
                  primary: er ? colors.Tertiary : 'black',
                },
              }}
              selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
              outlineColor={er ? colors.Tertiary : null}>
              Country of origin:{' '}
              {STUDENT_REGISTRATION_STORE.getNationality.toUpperCase()}
            </TextInput>
          </TouchableOpacity>
        )}

        {er && <Error text={erMsg} />}
        <View
          style={{
            height: verticalScale(170),

            width: scale(50),
          }}
        />
        <NextButton handler={scroll} />
      </View>
    </ScrollView>
  );
});

const styles = ScaledSheet.create({
  scrollView: {
    width: WIDTH,

    backgroundColor: colors.regBackground,
  },
  input: {
    width: '100%',
  },
  title: {
    fontSize: '18@s',
    //color: colors.FontColor,
    
    color: '#000000',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: '10@vs',
  },
  subtitle: {
    fontSize: '12@s',
    color: '#555555',
    marginTop: '5@vs',
    textAlign: 'center',
  },
  header: {
    fontSize: '18@s',
    //color: colors.FontColor,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '40@vs',
  },
});

export default Name;