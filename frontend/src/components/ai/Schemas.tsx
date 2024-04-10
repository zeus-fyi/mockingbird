import {
    CardActions,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextareaAutosize,
    ToggleButton
} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useEffect} from "react";
import Box from "@mui/material/Box";
import {setSchema, setSchemaField} from "../../redux/ai/ai.reducer";
import {useDispatch, useSelector} from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {JsonSchemaField} from "../../redux/ai/ai.types.schemas";

export function Schemas(props: any) {
    const {schema, schemaField,loading, createOrUpdateSchema,
        addJsonSchemaFieldRow, removeSchemaField} = props;
    const addSchemasView = useSelector((state: any) => state.ai.addSchemasView);
    const editJsonSchemaField = (index: number) => {
        dispatch(setSchemaField(schema.fields[index]));
    }
    const removeJsonSchemaField = (index: number) => {
        removeSchemaField(index);
    }
    // useEffect hook to handle changes in addSchemasView
    useEffect(() => {
        if(addSchemasView) {
        }
    }, [addSchemasView, schema]); // Dependency array includes addSchemasView

    const dispatch = useDispatch();
    if (addSchemasView) {
        return <div></div>
    }

    if (!schema) {
        return <div></div>
    }

    return (
        <div>
            <Box sx={{ ml: 0, mr: 2 }} >
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Schemas
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Add JSON schema definitions for JSON tasks.
                    </Typography>
                </CardContent>
            </Box>
            <Stack direction="row" >
                <Box sx={{ width: '50%', ml:2, mb: 0, mt: 0 }}>
                    <TextField
                        label={`Schema Name`}
                        variant="outlined"
                        value={schema.schemaName}
                        onChange={(event) => dispatch(setSchema(
                            { ...schema, schemaName: event.target.value }))}
                        fullWidth
                    />
                </Box>
                <Box sx={{ width: '50%', ml:2, mb: 0, mt: 0, mr: 2 }}>
                    <TextField
                        label={`Schema Group`}
                        variant="outlined"
                        value={schema.schemaGroup}
                        onChange={(event) => dispatch(setSchema(
                            { ...schema, schemaGroup: event.target.value }))}
                        fullWidth
                    />
                </Box>
            </Stack>
            <Box sx={{ ml:2, mr: 2, mb: 0, mt: 2 }}>
                <TextField
                    label={`Schema Description`}
                    variant="outlined"
                    value={schema.schemaDescription}
                    onChange={(event) => dispatch(setSchema(
                        { ...schema, schemaDescription: event.target.value }))}
                    fullWidth
                />
            </Box>
            <Stack direction="row" >
                <Box  sx={{ mb: 2,ml: 2, mr:2, mt: 2  }}>
                    <ToggleButton
                        value="check"
                        selected={schema.isObjArray}
                        onChange={(event) => dispatch(setSchema(
                            { ...schema, isObjArray: !schema.isObjArray }))}
                    >
                        {schema.isObjArray ? 'JSON Object Array' : 'JSON Object'}
                    </ToggleButton>
                </Box>
                <Box  sx={{ mt: 4, mb: 0,ml: 2, mr:2  }}>
                    <Typography variant="body2" color="text.secondary">
                        Sets response type as JSON object or an array of JSON objects.
                    </Typography>
                </Box>
            </Stack>
            <Stack direction="row" >
                <Box flexGrow={7} sx={{ mb: 2,ml: 2, mr:0  }}>
                    <TextField
                        fullWidth
                        id="field-name"
                        label="Field Name"
                        variant="outlined"
                        value={schemaField.fieldName}
                        onChange={(e) => dispatch(setSchemaField({
                            ...schemaField, // Spread the existing action properties
                            fieldName: e.target.value // Update the actionName
                        }))}
                    />
                </Box>
                <Box flexGrow={7} sx={{ mb: 2,ml: 2, mr:0  }}>
                    <FormControl fullWidth >
                        <InputLabel id="field-data-type">Data Type</InputLabel>
                        <Select
                            labelId="field-data-type-label"
                            id="field-data-type-label"
                            label="Data Type"
                            fullWidth
                            value={schemaField.dataType}
                            onChange={(e) => dispatch(setSchemaField({
                                ...schemaField, // Spread the existing action properties
                                dataType: e.target.value // Update the actionName
                            }))}
                        >
                            <MenuItem value="integer">{'integer'}</MenuItem>
                            <MenuItem value="number">{'number'}</MenuItem>
                            <MenuItem value="string">{'string'}</MenuItem>
                            <MenuItem value="boolean">{'boolean'}</MenuItem>
                            <MenuItem value="array[boolean]">{'array[boolean]'}</MenuItem>
                            <MenuItem value="array[integer]">{'array[integer]'}</MenuItem>
                            <MenuItem value="array[number]">{'array[number]'}</MenuItem>
                            <MenuItem value="array[string]">{'array[string]'}</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ mt: 1, mb: 0,ml: 2, mr:0  }}>
                    <Button
                        fullWidth
                        variant={"contained"}
                        onClick={() => addJsonSchemaFieldRow()}
                    >
                        Add
                    </Button>
                </Box>
                <Box sx={{ mt: 1, mb: 0,ml: 2, mr:2  }}>
                    <Button fullWidth
                            variant={"contained"}
                            onClick={() => dispatch(setSchemaField({
                                fieldName: '',
                                dataType: '',
                                fieldDescription: '',
                                evalMetrics: []
                            }))}
                    >Clear</Button>
                </Box>
            </Stack>
            <Box  sx={{ mt: 1, mb: 0,ml: 2, mr:2  }}>
                <Typography variant="body2" color="text.secondary">
                    Field description
                </Typography>
            </Box>
            <Box  sx={{ mb: 2, mt: 1, ml: 2, mr: 2 }}>
                <TextareaAutosize
                    minRows={18}
                    value={schemaField.fieldDescription}
                    onChange={(e) => dispatch(setSchemaField({
                        ...schemaField,
                        fieldDescription: e.target.value
                    }))}
                    style={{ resize: "both", width: "100%" }}
                />
            </Box>
            {
                !loading && schema && schema.fields && schema.fields.map((field: JsonSchemaField, index: number) => (
                    field &&
                    <Stack key={index} direction="column" sx={{ mt: 4, mb: 4, mr: 0 }}>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 4, mb: 4 }}>
                            {/* Metric Name */}
                            <Box flexGrow={1} sx={{ ml: 4, mr: 4 }}>
                                <TextField
                                    fullWidth
                                    id={`field-name-${field.fieldName}-${index}`}
                                    label="Field Name"
                                    variant="outlined"
                                    value={field.fieldName}
                                    inputProps={{ readOnly: true }}
                                />
                            </Box>
                            <Box flexGrow={1} sx={{ ml: 4, mr: 4 }}>
                                <TextField
                                    fullWidth
                                    id={`field-type-${field.dataType}-${index}`}
                                    label="Field Type"
                                    variant="outlined"
                                    value={field.dataType}
                                    inputProps={{ readOnly: true }}
                                />
                            </Box>
                            <Stack direction="row" spacing={2} sx={{ ml: 4, mr: 4 }}>
                                <Box sx={{ mr: 4 }}>
                                    <Button variant={"contained"} onClick={() => editJsonSchemaField(index)}>Edit</Button>
                                </Box>
                                <Box sx={{ mr: 4 }}>
                                    <Button variant={"contained"} onClick={() => removeJsonSchemaField(index)}>Remove</Button>
                                </Box>
                            </Stack>
                        </Stack>
                        <Box flexGrow={1} sx={{ ml: 0, mr: 12 }}>
                            <TextField
                                fullWidth
                                id={`field-description-${field.dataType}-${index}`}
                                label="Field Description"
                                variant="outlined"
                                value={field.fieldDescription}
                                inputProps={{ readOnly: true }}
                            />
                        </Box>
                    </Stack>
                ))
            }
            <CardActions>
                <Box flexGrow={1} sx={{ ml: 0, mr: 0}}>
                    <Button fullWidth variant="contained" onClick={createOrUpdateSchema}>Create or Update Schema</Button>
                </Box>
            </CardActions>
        </div>
    )
}