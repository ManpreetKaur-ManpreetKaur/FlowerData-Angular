import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";
import {Flower} from "./flower";
import {CatalogJson, FlowerJson} from "./json-structure";
import {catalog} from "./catalog-data";

@Injectable({
  providedIn: 'root'
})
export class FlowerDataService {

  private flowers: Flower[] = []
  constructor() {
    catalog.flowers.forEach(
      (flowerJson: FlowerJson) => this.flowers.push(FlowerDataService.json2Flower(flowerJson)));
  }

  private static imageFolder = 'assets/images/flowers/';

  private static json2Flower(flowerJson: FlowerJson): Flower {
    const flower = new Flower();
    flower.id = flowerJson.id;
    flower.label = flowerJson.label;
    flower.price = flowerJson.price;
    flower.description = flowerJson.description;
    flower.largeImgSrc = FlowerDataService.imageFolder + flowerJson.picture.large;
    flower.smallImgSrc = FlowerDataService.imageFolder + flowerJson.picture.small;
    return flower;
  }

  public getFlowerList(): Flower[] {
    return this.flowers;
  }

  public getFlower(id: String): Flower {
    return <Flower>this.flowers.find(flower => flower.id === id)
  }

}
