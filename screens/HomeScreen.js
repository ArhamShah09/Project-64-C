import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from '../database';

export default class HomeScreen extends Component {

    constructor() {
        super();
        this.state={
            text: '',
            isSearchPressed : false,
            isLoading : false,
            word  : "Loading...",
            lexicalCategory : '',
            definition : ''
        }
    }

    getWord=(word)=>{
        var searchKeyword = word.toLowerCase();
        var url = "https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22"+searchKeyword+".json";

        return fetch(url)
        .then((data)=>{

            if(data.status===200) {

                return data,json();

            }else {

                return null;

            }
        })

        .then((response)=>{
            
            var responseObject = response;

            if(responseObject) {
                var wordData = responseObject.definations[0];

                var defination = wordData.description;
                var lexicalCategory = wordData.wordType;

                this.setState({
                    "word" : this.state.text,
                    "defination" : defination,
                    "lexicalCategory" : lexicalCategory
                });

            }else {
                this.setState({
                    "word" : this.state.text,
                    "defination" : "Not Found",
                });
            }
        });
    }

    /*getWord=(text)=>{
        var text = text.toLowerCase()
        //try{
            var word = dictionary[text]["word"]
            var lexicalCategory = dictionary[text]["lexicalCategory"]
            var defination = dictionary[text]["defination"]
            this.setState({
                "word" : word,
                "lexicalCategory" : lexicalCategory,
                "defination" : defination
            });
        //}
    }

    catch(err) {
        alert("Sorry this word is not available for now")
        this.setState({
            'text' : '',
            'isSearchPressed' : false
        })
    }*/

    render() {
        return (
            <View style={{flex:1, borderWidth:2}}>
        
        <View style={styles.inputBoxContainer}>
        
          <TextInput
            style={styles.inputBox}
            onChangeText={text => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word  : "Loading...",
                lexicalCategory :'',
                examples : [],
                definition : ""
              });
            }}
            value={this.state.text}
          />

          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              this.setState({ isSearchPressed: true });
              this.getWord(this.state.text)
            }}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.outputContainer}>
          <Text style={{fontSize:20}}>
            {
              this.state.isSearchPressed && this.state.word === "Loading..."
              ? this.state.word
              : ""
            }
          </Text>
            {
              this.state.word !== "Loading..." ?
              (
                <View style={{justifyContent:'center', marginLeft:10 }}>

                  <View style={styles.detailsContainer}>

                    <Text style={styles.detailsTitle}>
                      Word :{" "}
                    </Text>

                    <Text style={{fontSize:18 }}>
                      {this.state.word}
                    </Text>

                  </View>

                  <View style={styles.detailsContainer}>

                    <Text style={styles.detailsTitle}>
                      Type :{" "}
                    </Text>

                    <Text style={{fontSize:18}}>
                      {this.state.lexicalCategory}
                    </Text>

                  </View>

                  <View style={{flexDirection:'row',flexWrap: 'wrap'}}>

                    <Text style={styles.detailsTitle}>
                      Definition :{" "}
                    </Text>

                    <Text style={{ fontSize:18}}>
                      {this.state.definition}
                    </Text>

                  </View>
                  
                </View>
              )
              :null
            }

        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputBoxContainer: {
    flex:0.3,
    alignItems:'center',
    justifyContent:'center'
  },
  inputBox: {
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
  },
  searchButton: {
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  searchText:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  outputContainer:{
    flex:0.7,
    alignItems:'center'
  },
  detailsContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  detailsTitle:{
    color:'orange',
    fontSize:20,
    fontWeight:'bold'
  }
});