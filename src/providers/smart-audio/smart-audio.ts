import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeAudio } from '@ionic-native/native-audio'
import {Platform} from "ionic-angular";


/*
  Generated class for the SmartAudioProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SmartAudioProvider {

  audioType: string='html5';
  sounds: any =[];

  constructor(public nativeAudio:NativeAudio,platform:Platform) {
    console.log('Hello SmartAudioProvider Provider');
    if(platform.is('cordova')){
      this.audioType='native';
    }
  }

  preload(key,asset){
    if(this.audioType === 'html5'){
     let audio = {
       key:key,
       asset:asset,
       type:'html5'
     } ;
     this.sounds.push(audio);
      console.log('if preload the audio key:'+audio.key);
    }else{
      this.nativeAudio.preloadSimple(key,asset);
      let audio = {
        key:key,
        asset:key,
        type:'native'
      };
      this.sounds.push(audio);
      console.log('else preload the audio key:'+audio.key);
    }
    console.log('sounds :'+this.sounds[0].key);
  }


  play(key){
    let audio = this.sounds.find((sound)=>{
      return sound.key === key;

    });
    console.log('find the sound:'+audio.key);

    if(audio.type=== 'html5'){
        let audioAsset = new Audio(audio.asset);
        audioAsset.play();
    }else{
      this.nativeAudio.play(audio.asset).then((res)=>{
        console.log(res);
      },(err)=>{
        console.log(err);
      });
    }
  }

}
