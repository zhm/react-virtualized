/**       */

             
                    
            
           
               
                        
                  
                     
                       
                 
                                                               

import Grid, {accessibilityOverscanIndicesGetter} from '../Grid';
import * as React from 'react';
import clsx from 'clsx';

/**
 * It is inefficient to create and manage a large list of DOM elements within a scrolling container
 * if only a few of those elements are visible. The primary purpose of this component is to improve
 * performance by only rendering the DOM nodes that a user is able to see based on their current
 * scroll position.
 *
 * This component renders a virtualized list of elements with either fixed or dynamic heights.
 */

              
                        

     
                                                                              
                                                                         
     
                      

                                
                     

     
                                                                                                    
                                                                 
     
                           

                                                                                  
                 

                                                                         
                                    

                                                                                            

                                                 

     
                                                                                            
                                                                                 
     
                                     

                                       
                                               

     
                                                                         
                                                                 
     
                           

                                                                                                            
                      

                                                                                  
                           

                                
                   

                                   
                               

                                                                           
                        

                         
                     

                              
                

                            
                    

                      
                
  

export default class List extends React.PureComponent        {
  static defaultProps = {
    autoHeight: false,
    estimatedRowSize: 30,
    onScroll: () => {},
    noRowsRenderer: () => null,
    onRowsRendered: () => {},
    overscanIndicesGetter: accessibilityOverscanIndicesGetter,
    overscanRowCount: 10,
    scrollToAlignment: 'auto',
    scrollToIndex: -1,
    style: {},
  };

                                       

  forceUpdateGrid() {
    if (this.Grid) {
      this.Grid.forceUpdate();
    }
  }

  /** See Grid#getOffsetForCell */
  getOffsetForRow({alignment, index}                                       ) {
    if (this.Grid) {
      const {scrollTop} = this.Grid.getOffsetForCell({
        alignment,
        rowIndex: index,
        columnIndex: 0,
      });

      return scrollTop;
    }
    return 0;
  }

  /** CellMeasurer compatibility */
  invalidateCellSizeAfterRender({columnIndex, rowIndex}              ) {
    if (this.Grid) {
      this.Grid.invalidateCellSizeAfterRender({
        rowIndex,
        columnIndex,
      });
    }
  }

  /** See Grid#measureAllCells */
  measureAllRows() {
    if (this.Grid) {
      this.Grid.measureAllCells();
    }
  }

  /** CellMeasurer compatibility */
  recomputeGridSize({columnIndex = 0, rowIndex = 0}               = {}) {
    if (this.Grid) {
      this.Grid.recomputeGridSize({
        rowIndex,
        columnIndex,
      });
    }
  }

  /** See Grid#recomputeGridSize */
  recomputeRowHeights(index         = 0) {
    if (this.Grid) {
      this.Grid.recomputeGridSize({
        rowIndex: index,
        columnIndex: 0,
      });
    }
  }

  /** See Grid#scrollToPosition */
  scrollToPosition(scrollTop         = 0) {
    if (this.Grid) {
      this.Grid.scrollToPosition({scrollTop});
    }
  }

  /** See Grid#scrollToCell */
  scrollToRow(index         = 0) {
    if (this.Grid) {
      this.Grid.scrollToCell({
        columnIndex: 0,
        rowIndex: index,
      });
    }
  }

  render() {
    const {className, noRowsRenderer, scrollToIndex, width} = this.props;

    const classNames = clsx('ReactVirtualized__List', className);

    return (
      <Grid
        {...this.props}
        autoContainerWidth
        cellRenderer={this._cellRenderer}
        className={classNames}
        columnWidth={width}
        columnCount={1}
        noContentRenderer={noRowsRenderer}
        onScroll={this._onScroll}
        onSectionRendered={this._onSectionRendered}
        ref={this._setRef}
        scrollToRow={scrollToIndex}
      />
    );
  }

  _cellRenderer = ({
    parent,
    rowIndex,
    style,
    isScrolling,
    isVisible,
    key,
  }                    ) => {
    const {rowRenderer} = this.props;

    // TRICKY The style object is sometimes cached by Grid.
    // This prevents new style objects from bypassing shallowCompare().
    // However as of React 16, style props are auto-frozen (at least in dev mode)
    // Check to make sure we can still modify the style before proceeding.
    // https://github.com/facebook/react/commit/977357765b44af8ff0cfea327866861073095c12#commitcomment-20648713
    const {writable} = Object.getOwnPropertyDescriptor(style, 'width');
    if (writable) {
      // By default, List cells should be 100% width.
      // This prevents them from flowing under a scrollbar (if present).
      style.width = '100%';
    }

    return rowRenderer({
      index: rowIndex,
      style,
      isScrolling,
      isVisible,
      key,
      parent,
    });
  };

  _setRef = (ref                                ) => {
    this.Grid = ref;
  };

  _onScroll = ({clientHeight, scrollHeight, scrollTop}            ) => {
    const {onScroll} = this.props;

    onScroll({clientHeight, scrollHeight, scrollTop});
  };

  _onSectionRendered = ({
    rowOverscanStartIndex,
    rowOverscanStopIndex,
    rowStartIndex,
    rowStopIndex,
  }                 ) => {
    const {onRowsRendered} = this.props;

    onRowsRendered({
      overscanStartIndex: rowOverscanStartIndex,
      overscanStopIndex: rowOverscanStopIndex,
      startIndex: rowStartIndex,
      stopIndex: rowStopIndex,
    });
  };
}
