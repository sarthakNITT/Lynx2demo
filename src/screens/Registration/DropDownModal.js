import {observer} from 'mobx-react';
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
// import {Divider, Searchbar} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';
import Text from '../../components/TextComponent';
import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';
import * as colors from '../../utils/colors';
import {
  MODAL_TYPE_CODE,
  MODAL_TYPE_DEPARTMENT,
  MODAL_TYPE_GENDER,
  MODAL_TYPE_NATIONALITY,
} from '../../utils/MODAL_DATABASE';

const DropDownModal = observer(({modalType, data}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => {
    console.log("Search Query: ", query); // Debugging log
    setSearchQuery(query);
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={STUDENT_REGISTRATION_STORE.getModalVisible}
        onRequestClose={() => {
          STUDENT_REGISTRATION_STORE.toggleModalVisible();
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
          contentContainerStyle={{
            ...styles.container,
            top: modalType !== MODAL_TYPE_GENDER ? verticalScale(30) : null,
          }}>
          <View
            style={{
              ...styles.modalView,
              height:
                modalType === MODAL_TYPE_GENDER
                  ? Dimensions.get('window').height / 3
                  : Dimensions.get('window').height / 1.4,
            }}>
            {/* {modalType !== MODAL_TYPE_GENDER && (
              <Searchbar
                style={{
                  elevation: 0,
                  margin: scale(10),
                  padding: 0,
                  height: verticalScale(50), // Ensuring sufficient height for input
                  color: 'black',
                }}
                placeholder={'Search'}
                onChangeText={onChangeSearch}
                value={searchQuery}
                selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
                iconColor={colors.BLACK}
              />
            )} */}
            <FlatList
              data={(data || []).filter(item => {
                if (
                  item.name.toUpperCase().search(searchQuery.toUpperCase()) !== -1
                )
                  return true;
                return false;
              })}
              showsVerticalScrollIndicator={false}
              style={{width: '100%'}}
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps={'always'}
              bounces={false}
              bouncesZoom={false}
              renderItem={({item}) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      if (modalType === MODAL_TYPE_CODE)
                        STUDENT_REGISTRATION_STORE.setCountryCode(item.code);
                      else if (modalType === MODAL_TYPE_NATIONALITY)
                        STUDENT_REGISTRATION_STORE.setNationality(item.name);
                      else if (modalType === MODAL_TYPE_GENDER)
                        STUDENT_REGISTRATION_STORE.setGender(item.name);
                      else {
                        STUDENT_REGISTRATION_STORE.setDepartment(item.name);
                        STUDENT_REGISTRATION_STORE.setDepartmentId(item._id);
                      }
                      setSearchQuery('');
                      STUDENT_REGISTRATION_STORE.toggleModalVisible();
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginVertical: verticalScale(6),
                      }}>
                      <View
                        style={{
                          width: modalType !== MODAL_TYPE_CODE ? '100%' : '80%',
                        }}>
                        <Text style={{fontSize: scale(14), color: 'black'}}>
                          {modalType === MODAL_TYPE_DEPARTMENT
                            ? item.name
                            : item.name.toUpperCase()}
                        </Text>
                      </View>
                      {modalType === MODAL_TYPE_CODE && (
                        <View style={{width: '20%'}}>
                          <Text style={{fontSize: scale(14), color: 'black'}}>
                            +{item.code}
                          </Text>
                        </View>
                      )}
                    </View>
                    {/* <Divider /> */}
                  </TouchableOpacity>
                </View>
              )}
              numColumns={1}
              keyExtractor={(item, index) => index.toString()} // Use toString for keyExtractor
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setSearchQuery('');
                STUDENT_REGISTRATION_STORE.toggleModalVisible();
              }}>
              <Text style={styles.textStyle}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
});

export default DropDownModal;

const styles = StyleSheet.create({
  modalView: {
    marginVertical: scale(12),
    marginHorizontal: scale(8),
    backgroundColor: colors.WHITE,
    opacity: 0.99,
    borderRadius: scale(20),
    padding: scale(15),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: scale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: scale(15),
    letterSpacing: 0.7,
    fontSize: scale(16),
    textAlign: 'justify',
    color: 'black',
  },
  modalTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: 'black',
  },
  closeButton: {
    borderRadius: scale(10),
    padding: scale(8),
    elevation: 2,
    backgroundColor: colors.EventDescriptionScreen_Button,
    marginTop: verticalScale(6),
  },
  textStyle: {
    color: 'white',
    fontSize: scale(14),
    paddingHorizontal: scale(18),
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
