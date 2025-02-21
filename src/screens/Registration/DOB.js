// import {observer} from 'mobx-react';
// import moment from 'moment';
// import React, {useState} from 'react';
// import {
//   Dimensions,
//   Keyboard,
//   View,
//   TouchableOpacity,
//   Text,
//   ScrollView,
//   Platform,
// } from 'react-native';
// import DatePicker from 'react-native-modal-datetime-picker';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import {TextInput} from 'react-native-paper';
// import {ScaledSheet, verticalScale} from 'react-native-size-matters';
// import Error from '../../components/Error';
// import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';
// import * as colors from '../../utils/colors';
// import {isValidDOB} from '../../utils/helperFunction/FormValidation';
// import BackButton from './backButton';
// import NextButton from './nextButton';

// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

// const Name = observer(({forwardAction, backwardAction}) => {
//   const [dateEr, setDateEr] = useState(false);
//   const [addEr, setAddEr] = useState(false);
//   const [datePicker, setDatePickerVisible] = useState(false);
//   //const [dateEr, setDateEr] = useState(false);
//   //const [addEr, setAddEr] = useState(false);
//   const [datePickerVisible] = useState(false);
//   const handleConfirmDate = (date) => {
//     setDatePickerVisible(false);
//     STUDENT_REGISTRATION_STORE.setDateSelected(true);
//     STUDENT_REGISTRATION_STORE.setBirthDay(moment(date).format('YYYY-MM-DD'));
//   };
  
//   //const [datePicker, setDatePicker] = useState(false);
//   const scroll = () => {
//     if (!isValidDOB(STUDENT_REGISTRATION_STORE.getBirthDay)) {
//       setDateEr(true);
//       return;
//     }
//     if (!STUDENT_REGISTRATION_STORE.getDateSelected) {
//       setDateEr(true);
//       if (!STUDENT_REGISTRATION_STORE.getAddress) {
//         setAddEr(true);
//       }
//       return;
//     }
//     if (!STUDENT_REGISTRATION_STORE.getAddress.trim()) {
//       setDateEr(false);
//       setAddEr(true);
//       return;
//     }
//     setAddEr(false);
//     setDateEr(false);
//     forwardAction();

//     Keyboard.dismiss();
//   };

//   const back = () => {
//     backwardAction();
//   };
//   const onChangeDate = newDate => {
//     console.log('LOLA1: ', newDate);
//     console.log('final1: ', moment(newDate).format('YYYY-MM-DD'));

//     STUDENT_REGISTRATION_STORE.setDateSelected(true);
//     setDatePicker(false);

//     STUDENT_REGISTRATION_STORE.setBirthDay(
//       moment(newDate).format('YYYY-MM-DD'),
//     );
//   };

//   return (
//     <>
//       {Platform.OS === 'ios' ? (
//         <View style={styles.container}>
//           <ScrollView
//             style={styles.scrollView}
//             onScroll={() => {
//               Keyboard.dismiss();
//             }}
//             scrollEventThrottle={10}
//             showsVerticalScrollIndicator={false}>
//             <Text style={styles.header}>Registration</Text>
//             <Text style={styles.title}>{'Basic Information'}</Text>
//             <Text style={styles.subtitle}>
//               {'Enter your date of birth and permanent address'}
//             </Text>
//             <TouchableOpacity
//               style={{...styles.inputAd, marginTop: verticalScale(5)}}
//               onPress={() => setDatePicker(true)}>
//               <Text
//                 mode="outlined"
//                 disabled={true}
//                 style={{
//                   marginHorizontal: 1,
//                   fontSize: 16,
//                   borderRadius: 5,
//                   borderWidth: 1,
//                   borderColor: '#3e3e3e',
//                   backgroundColor: '#f6f6f6',
//                   padding: 20,
//                   color: '#727272',
//                 }}
//                 theme={{
//                   colors: {
//                     primary: dateEr ? colors.Tertiary : 'black',
//                   },
//                 }}
//                 selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
//                 outlineColor={dateEr ? colors.Tertiary : null}
//                 left={
//                   <Text.Icon
//                     name="calendar"
//                     size={25}
//                     color={colors.BLACK}></Text.Icon>
//                 }>
//                 {STUDENT_REGISTRATION_STORE.getDateSelected
//                   ? 'Date of Birth: ' + STUDENT_REGISTRATION_STORE.getBirthDay
//                   : 'Select your Date of Birth'}
//               </Text>
//             </TouchableOpacity>

//             {dateEr && <Error text="Enter a valid date of birth" />}
//             <TextInput
//               label="Full Address"
//               mode="outlined"
//               theme={{
//                 colors: {
//                   primary: addEr ? colors.Tertiary : 'black',
//                 },
//               }}
//               value={STUDENT_REGISTRATION_STORE.getAddress}
//               multiline={true}
//               selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
//               outlineColor={addEr ? colors.Tertiary : null}
//               style={{...styles.inputAd, marginTop: verticalScale(5)}}
//               onChangeText={add => {
//                 STUDENT_REGISTRATION_STORE.setAddress(add);
//               }}
//             />
//             {addEr && <Error text="Enter your full address" />}
//             {datePicker && (
//               <DatePicker
//                 isVisible={datePicker}
//                 date={new Date(STUDENT_REGISTRATION_STORE.getBirthDay)}
//                 mode="date"
//                 timeZoneOffsetInMinutes={0}
//                 onConfirm={onChangeDate}
//                 onCancel={() => setDatePicker(false)}
//               />
//             )}
//           </ScrollView>
//           <NextButton handler={scroll} />
//           <BackButton handler={back} />
          
//         </View>
//       ) : (
//       //   <View style={styles.container}>
//       //     <Text style={styles.header}>Registration</Text>
//       //     <Text style={styles.title}>{'Basic Information'}</Text>
//       //     <Text style={styles.subtitle}>
//       //       {'Enter your date of birth and permanent address'}
//       //     </Text>
//       //     <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
//       //         <View
//       //           style={{
//       //              borderColor: dateEr ? colors.Tertiary : '#3e3e3e',
//       //               borderWidth: 1,
//       //               padding: 15,
//       //               borderRadius: 5,
//       //               backgroundColor: '#f6f6f6',
//       //             }}
//       //           >
//       //     <Text style={{ color: '#727272' }}>
//       //       {STUDENT_REGISTRATION_STORE.getDateSelected
//       //         ? 'Date of Birth: ' + STUDENT_REGISTRATION_STORE.getBirthDay
//       //         : 'Select your Date of Birth'}
//       //     </Text>
//       //   </View>
//       // </TouchableOpacity>
          
      

//       //     {/* <TouchableOpacity
//       //       style={{...styles.inputAd, marginTop: verticalScale(5)}}
//       //       onPress={() => setDatePicker(true)}>
//       //       <TextInput
//       //         mode="outlined"
//       //         disabled={true}
//       //         theme={{
//       //           colors: {
//       //             primary: dateEr ? colors.Tertiary : 'black',
//       //           },
//       //         }}
//       //         selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
//       //         outlineColor={dateEr ? colors.Tertiary : null}
//       //         left={
//       //           <TextInput.Icon
//       //             name="calendar"
//       //             size={25}
//       //             color={colors.BLACK}
//       //           />
//       //         }>
//       //         {STUDENT_REGISTRATION_STORE.getDateSelected
//       //           ? 'Date of Birth: ' + STUDENT_REGISTRATION_STORE.getBirthDay
//       //           : 'Select your Date of Birth'}
//       //       </TextInput>
//       //     </TouchableOpacity> */}

//       //     {/* {dateEr && <Error text="Enter a valid date of birth" />} */}
      

//       //     {dateEr && <Error text="Enter a valid date of birth" />}
//       //     <TextInput
//       //       label="Full Address"
//       //       mode="outlined"
//       //       theme={{
//       //         colors: {
//       //           primary: addEr ? colors.Tertiary : 'black',
//       //         },
//       //       }}
//       //       value={STUDENT_REGISTRATION_STORE.getAddress}
//       //       multiline={true}
//       //       selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
//       //       outlineColor={addEr ? colors.Tertiary : null}
//       //       style={{...styles.inputAd, marginTop: verticalScale(5)}}
//       //       onChangeText={add => {
//       //         STUDENT_REGISTRATION_STORE.setAddress(add);
//       //       }}
//       //     />
//       //     {addEr && <Error text="Enter your full address" />}
//       //     {datePicker && (
//       //       <DatePicker
//       //         isVisible={datePicker}
//       //         date={new Date(STUDENT_REGISTRATION_STORE.getBirthDay)}
//       //         mode="date"
//       //         timeZoneOffsetInMinutes={0}
//       //         onConfirm={onChangeDate}
//       //         onCancel={() => setDatePicker(false)}
//       //       />
//       //     )}
//       //     <NextButton handler={scroll} />
//       //     <BackButton handler={back} />
          
//       //   </View>
//       <View style={{ flex: 1, padding: 20 }}>
//       <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
//         Registration
//       </Text>
//       <Text style={{ textAlign: 'center', marginVertical: 10 }}>
//         Enter your date of birth and permanent address
//       </Text>

//       <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
//         <View
//           style={{
//             borderColor: dateEr ? colors.Tertiary : '#3e3e3e',
//             borderWidth: 1,
//             padding: 15,
//             borderRadius: 5,
//             backgroundColor: '#f6f6f6',
//           }}
//         >
//           <Text style={{ color: '#727272' }}>
//             {STUDENT_REGISTRATION_STORE.getDateSelected
//               ? 'Date of Birth: ' + STUDENT_REGISTRATION_STORE.getBirthDay
//               : 'Select your Date of Birth'}
//           </Text>
//         </View>
//       </TouchableOpacity>

//       {dateEr && <Error text="Enter a valid date of birth" />}

//       <TextInput
//         label="Full Address"
//         mode="outlined"
//         theme={{
//           colors: { primary: addEr ? colors.Tertiary : 'black' },
//         }}
//         value={STUDENT_REGISTRATION_STORE.getAddress}
//         multiline={true}
//         style={{ marginVertical: 10 }}
//         onChangeText={(text) => {
//           STUDENT_REGISTRATION_STORE.setAddress(text);
//         }}
//       />
      

//       {addEr && <Error text="Enter your full address" />}

//       <DateTimePickerModal
//         isVisible={datePickerVisible}
//         mode="date"
//         onConfirm={handleConfirmDate}
//         onCancel={() => setDatePickerVisible(false)}
//       />
      
//     </View>
//       )}
//     </>
//   );
// });

// const styles = ScaledSheet.create({
//   container: {
//     width: WIDTH,
//     backgroundColor: colors.regBackground,
//     paddingHorizontal: '20@s',
//     alignItems: 'center',
//     ...Platform.select({
//       ios: {
//         height: HEIGHT - 80,
//       },
//       android: {
//         height: HEIGHT,
//       },
//     }),
//   },
//   viewScale: {
//     paddingVertical: verticalScale(4),
//     //marginHorizontal: scale(HorizontalPadding),
//     height: '20%',
//   },

//   inputAd: {width: '100%'},
//   title: {
//     fontSize: '18@s',
//     color: colors.FontColor,
//     fontWeight: '500',
//     textAlign: 'center',
//     marginTop: '10@vs',
//   },
//   subtitle: {
//     fontSize: '12@s',
//     color: '#555555',
//     marginTop: '5@vs',
//     textAlign: 'center',
//   },
//   header: {
//     fontSize: '18@s',
//     color: colors.FontColor,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop: '40@vs',
//   },
//   scrollView: {
//     width: '100%',

//     backgroundColor: colors.regBackground,
//   },
// });

// export default Name;
// import React, { useState } from 'react';
// import { View, TouchableOpacity, Text, Platform } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import { TextInput } from 'react-native-paper';
// import moment from 'moment';
// import { STUDENT_REGISTRATION_STORE } from '../../mobx/STUDENT_REGISTRATION_STORE';
// import Error from '../../components/Error';
// import * as colors from '../../utils/colors';
// import BackButton from './backButton';
// import NextButton from './nextButton';

// const Name = ({ forwardAction, backwardAction }) => {
  // const [dateEr, setDateEr] = useState(false);
  // const [addEr, setAddEr] = useState(false);
  // const [datePickerVisible, setDatePickerVisible] = useState(false);

  // const handleConfirmDate = (date) => {
  //   setDatePickerVisible(false);
  //   STUDENT_REGISTRATION_STORE.setDateSelected(true);
  //   STUDENT_REGISTRATION_STORE.setBirthDay(moment(date).format('YYYY-MM-DD'));
  // };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
//         Registration
//       </Text>
//       <Text style={{ textAlign: 'center', marginVertical: 10 }}>
//         Enter your date of birth and permanent address
//       </Text>

//       <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
//         <View
//           style={{
//             borderColor: dateEr ? colors.Tertiary : '#3e3e3e',
//             borderWidth: 1,
//             padding: 15,
//             borderRadius: 5,
//             backgroundColor: '#f6f6f6',
//           }}
//         >
//           <Text style={{ color: '#727272' }}>
//             {STUDENT_REGISTRATION_STORE.getDateSelected
//               ? 'Date of Birth: ' + STUDENT_REGISTRATION_STORE.getBirthDay
//               : 'Select your Date of Birth'}
//           </Text>
//         </View>
//       </TouchableOpacity>

//       {dateEr && <Error text="Enter a valid date of birth" />}

//       <TextInput
//         label="Full Address"
//         mode="outlined"
//         theme={{
//           colors: { primary: addEr ? colors.Tertiary : 'black' },
//         }}
//         value={STUDENT_REGISTRATION_STORE.getAddress}
//         multiline={true}
//         style={{ marginVertical: 10 }}
//         onChangeText={(text) => {
//           STUDENT_REGISTRATION_STORE.setAddress(text);
//         }}
//       />
      

//       {addEr && <Error text="Enter your full address" />}

//       <DateTimePickerModal
//         isVisible={datePickerVisible}
//         mode="date"
//         onConfirm={handleConfirmDate}
//         onCancel={() => setDatePickerVisible(false)}
//       />
      
//     </View>
    
//   );
// };

// export default Name;
import { observer } from 'mobx-react';
import moment from 'moment';
import React, { useState } from 'react';
import {
  Dimensions,
  Keyboard,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import { TextInput } from 'react-native-paper';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import Error from '../../components/Error';
import { STUDENT_REGISTRATION_STORE } from '../../mobx/STUDENT_REGISTRATION_STORE';
import * as colors from '../../utils/colors';
import { isValidDOB } from '../../utils/helperFunction/FormValidation';
import BackButton from './backButton';
import NextButton from './nextButton';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Name = observer(({ forwardAction, backwardAction }) => {
  const [dateEr, setDateEr] = useState(false);
  const [addEr, setAddEr] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const handleConfirmDate = (date) => {
    setDatePickerVisible(false);
    STUDENT_REGISTRATION_STORE.setDateSelected(true);
    STUDENT_REGISTRATION_STORE.setBirthDay(moment(date).format('YYYY-MM-DD'));
  };

  const scroll = () => {
    if (!isValidDOB(STUDENT_REGISTRATION_STORE.getBirthDay)) {
      setDateEr(true);
      return;
    }
    if (!STUDENT_REGISTRATION_STORE.getDateSelected) {
      setDateEr(true);
      if (!STUDENT_REGISTRATION_STORE.getAddress) {
        setAddEr(true);
      }
      return;
    }
    if (!STUDENT_REGISTRATION_STORE.getAddress.trim()) {
      setDateEr(false);
      setAddEr(true);
      return;
    }
    setAddEr(false);
    setDateEr(false);
    forwardAction();
    Keyboard.dismiss();
  };

  const back = () => {
    backwardAction();
  };

  return (
    <>
      <View style={{ flex: 1, padding: 20 }}>
        {/* <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', textColor: '#000000' }}>
          Registration
        </Text> */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#000' }}>
  Registration
</Text>
        <Text style={{ textAlign: 'center', marginVertical: 10, color: '#000' }}>
          Enter your date of birth and permanent address
        </Text>

        <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
          <View
            style={{
              borderColor: dateEr ? colors.Tertiary : '#3e3e3e',
              borderWidth: 1,
              padding: 15,
              borderRadius: 5,
              backgroundColor: '#f6f6f6',
            }}
          >
            <Text style={{ color: '#727272' }}>
              {STUDENT_REGISTRATION_STORE.getDateSelected
                ? 'Date of Birth: ' + STUDENT_REGISTRATION_STORE.getBirthDay
                : 'Select your Date of Birth'}
            </Text>
          </View>
        </TouchableOpacity>

        {dateEr && <Error text="Enter a valid date of birth" />}

        {/* <TextInput
          label="Full Address"
          mode="outlined"
          theme={{
            colors: { primary: addEr ? colors.Tertiary : 'black' },
          }}
          value={STUDENT_REGISTRATION_STORE.getAddress}
          multiline={true}
          style={{ marginVertical: 10 }}
          onChangeText={(text) => {
            STUDENT_REGISTRATION_STORE.setAddress(text);
          }}
        /> */}

        {addEr && <Error text="Enter your full address" />}

        {/* <DateTimePickerModal
          isVisible={datePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={() => setDatePickerVisible(false)}
        /> */}

        <NextButton handler={scroll} />
        <BackButton handler={back} />
      </View>
    </>
  );
});

const styles = ScaledSheet.create({
  container: {
    width: WIDTH,
    backgroundColor: colors.regBackground,
    paddingHorizontal: '20@s',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        height: HEIGHT - 80,
      },
      android: {
        height: HEIGHT,
      },
    }),
  },
  inputAd: { width: '100%' },
  title: {
    fontSize: '18@s',
    color: colors.FontColor,
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
    color: colors.FontColor,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '40@vs',
  },
});

export default Name;
