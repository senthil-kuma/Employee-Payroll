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
  docData,
  updateDoc,
  arrayRemove,
} from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  loadedPosts: any;

  constructor(public http: HttpClient, private firestore: Firestore) {}

  get(path) {
    let dataRef = doc(this.firestore, path);
    return docData(dataRef)as Observable<any>;

  }

  getList(path) {
    let dataRef = collection(this.firestore, path);
    return collectionData(dataRef, { idField: 'id' }) as Observable<any[]>;
  }

  delete() {
    let path = `Skills/euf1BFJm4s4V39VH3wFY/skils/${0}` 
    let dataRef = doc(this.firestore, path );
    return deleteDoc(dataRef);
  }

  add(path, data) {
    let dataRef = collection(this.firestore, path);
    return addDoc(dataRef, data);
  }

  set(path, data) {
    let dataRef = doc(this.firestore, path);
    return setDoc(dataRef, data);
  }

  getDocumentById(id) {
    let db = getFirestore();
    let docRef = doc(db, 'employees', id);
    return getDoc(docRef);
  }

deleteSkill(val,coll,id){

  let db=getFirestore()
  const docRef = doc(db, coll, id);

const valueToRemove = val;

updateDoc(docRef, {
  skils: arrayRemove(valueToRemove)
})
.then(() => {
  console.log("Value has been removed successfully!");
})
.catch((error) => {
  console.error("Error on removing value: ", error);
});
}

}
