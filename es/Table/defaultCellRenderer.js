/**       */
                                                

/**
 * Default cell renderer that displays an attribute as a simple string
 * You should override the column's cellRenderer if your data is some other type of object.
 */
export default function defaultCellRenderer({
  cellData,
}                    )         {
  if (cellData == null) {
    return '';
  } else {
    return String(cellData);
  }
}
