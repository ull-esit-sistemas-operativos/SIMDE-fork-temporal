import * as React from 'react';
declare var window: any;

export class FunctionalUnitComponent extends React.Component<any, any> {

   constructor(props: any) {
      super(props);
      this.state = {
         title: null,
         content: [],
         showableContent: [],
         showableHeader: []
      };
      window.state[this.props.title] = (data) => {
         let newState = {
            content: data,
            showableContent: null,
            showableHeader: null
         };
         // #0 | #1
         // L1   L1
         // L2   L2
         // L3   L3
         // -> Number of Funcional Units
         // | Latency
         newState.showableContent = this.buildShowableContent(data.content).slice();
         newState.showableHeader = this.buildShowableHeader(data.content);
         this.setState(newState);
      };
   }

   buildShowableContent(data): any[] {
      let toReturn = new Array();
      if (data != null && data[0] != null) {
         for (let i = 0; i < data[0].flow.length; i++) {
            let aux = [];
            for (let j = 0; j < data.length; j++) {
               if (((data[j]).flow[i]) != null) {
                  aux.push((data[j]).flow[i].id);
               } else {
                  aux.push(' ');
               }
            }
            toReturn.push(aux);
         }
      }
      return toReturn;
   }

   buildShowableHeader(data): string[] {
      let toReturn = [];
      if (data != null) {
         for (let i = 0; i < data.length; i++) {
            toReturn.push(`#${i}`);
         }
      }
      return toReturn;
   }

   render() {
      return (
         <div className='panel panel-default'>
            <div className='panel-heading'>{this.props.title}</div>
            <div className='panel-body'>
               <table className='table table-bordered'>
                  {<thead>
                     <tr>
                        {this.state.showableHeader.map((element, i) =>
                           <th key={this.props.title + 'FUTitle' + i}>{element}</th>)}
                     </tr>
                  </thead>}
                  <tbody>
                     {
                        this.state.showableContent.map((element, i) =>
                           <tr key={this.props.title + 'FU' + i}>
                              {element.map((content, j) =>
                                 <td key={this.props.title + 'FU' + i + j}>{content}</td>
                              )}
                           </tr>
                        )
                     }
                  </tbody>
               </table>
            </div>
         </div>);
   }
}
