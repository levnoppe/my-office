
export class UtilService{
  public sortingObjectsArray(
    array: any[],
    sortingParameter: string,
    reviseDirection: boolean
  ) {

    const compare = ( a, b ) => {
      if ( a[sortingParameter] > b[sortingParameter] ){
        return reviseDirection ? -1 : 1;
      }
      if ( a[sortingParameter] < b[sortingParameter] ){
        return reviseDirection ? 1 : -1;
      }
      return 0;
    };

    return array.slice().sort(compare);

  }
}
