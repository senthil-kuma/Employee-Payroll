import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  setDoc,
  getDoc,
  getFirestore,
  docData
} from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  loadedPosts: any;

  constructor(public http: HttpClient, private firestore: Firestore) {}
 

  get(path){
    let dataRef = doc(this.firestore, path);
    return docData(dataRef);
  }

  getList(path) {
    let dataRef = collection(this.firestore, path);
    return collectionData(dataRef, { idField: 'id' }) as Observable<any[]>;
  }

  delete(path) {
    let dataRef = doc(this.firestore, path);
    return deleteDoc(dataRef);
  }

  add(path, data) {
    let dataRef = collection(this.firestore, path);
    return addDoc(dataRef, data);
  }

  set(path, data) {
    let dataRef = doc(this.firestore,path);
    return setDoc(dataRef, data);
  }


  getDocumentById(id){
   let  db= getFirestore();
  let docRef=  doc(db,'employees',id);
   return getDoc(docRef) ;
  }
}
