# a separate file for quick ideas of current backend data structure

## python memory
- `sheets`: dict; for all the sheets; {`sheet_name`: `sheet_data`}
    - `sheet_name`: str; name of the sheet
    - `sheet_data`: tuple; each column's field name, the actual data of the table; (`2d_list`, `field_name`)
        - `2d_list`: lists of lists of anything; the part where the table data is stored, `[[1,2,3], [4,5,6]]` has 2 rows and 3 columns.
        - `field_name`: list of strings; names of each column of the table, corresponds to the field name of MySQL database; [`'name'`, `'university'`, `'degree'`, ...]

## MySQL database
- `dataJupyter`: schema name
    - `sheet_name`: name of the table
        - `field_name`: name of each field (column)
        - `2d_list`: data