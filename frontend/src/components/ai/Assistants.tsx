import {
    CardActions,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextareaAutosize
} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import {setAssistant} from "../../redux/ai/ai.reducer";
import {useDispatch} from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

export function Assistants(props: any) {
    const {assistant, createOrUpdateAssistant, requestStatusAssistant, requestStatusAssistantError} = props;
    const dispatch = useDispatch();
    return (
        <div>
            <Box sx={{ ml: -1.5, mr: 2 }} >
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Assistants
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage OpenAI Assistants. You must have an OpenAI API key to use this feature. Store your API key
                        in the Secrets Manager, setting secret name to "openai-api-key" and key="mockingbird", then value="API_SECRET_KEY".
                    </Typography>
                </CardContent>
            </Box>
            <Stack direction="row" >
                <Box sx={{ width: '50%', ml:0, mb: 0, mt: 0 }}>
                    <TextField
                        label={`Assistant Name`}
                        variant="outlined"
                        value={assistant.name}
                        onChange={(event) => dispatch(setAssistant(
                            { ...assistant, name: event.target.value }))}
                        fullWidth
                    />
                </Box>
                <Box sx={{ width: '50%', mb: 0, mt: 0, ml: 2, mr:0 }}>
                    <TextField
                        label={`Assistant Description`}
                        variant="outlined"
                        value={assistant.description}
                        onChange={(event) => dispatch(setAssistant(
                            { ...assistant, description: event.target.value }))}
                        fullWidth
                    />
                </Box>
            </Stack>
            <Stack direction="row" >
                <Box flexGrow={3} sx={{ mb: 4, mt: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="assistant-model-label">Assistant Model</InputLabel>
                        <Select
                            labelId="assistant-model-label"
                            id="assistant-model-select"
                            value={assistant.model}
                            label="Assistant Model"
                            onChange={(event) => dispatch(setAssistant(
                                { ...assistant, model: event.target.value }))}
                        >
                            <MenuItem value="gpt-3.5-turbo-1106">gpt-3.5-turbo-1106</MenuItem>
                            <MenuItem value="gpt-3.5-turbo">gpt-3.5-turbo</MenuItem>
                            <MenuItem value="gpt-4">gpt-4</MenuItem>
                            <MenuItem value="gpt-4-32k">gpt-4-32k</MenuItem>
                            <MenuItem value="gpt-4-32k-0613">gpt-4-32k-0613</MenuItem>
                            <MenuItem value="gpt-4-0613">gpt-4-0613</MenuItem>
                            <MenuItem value="gpt-4-1106-preview">gpt-4-1106-preview</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Stack>
            <Stack direction="row" >
                <Box flexGrow={30} sx={{ mb: 2, mt: -2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Instructions
                    </Typography>
                    <TextareaAutosize
                        minRows={18}
                        value={assistant.instructions? assistant.instructions: ""}
                        onChange={(event) => dispatch(setAssistant(
                            { ...assistant, instructions: event.target.value }))}
                        style={{ resize: "both", width: "100%" }}
                    />
                </Box>
            </Stack>
            <CardActions>
                <Box flexGrow={1} sx={{ ml: 0, mr: 0}}>
                    <Button fullWidth variant="contained" onClick={createOrUpdateAssistant}>Create or Update Assistant</Button>
                </Box>
            </CardActions>
            {requestStatusAssistant != '' && (
                <Container sx={{ mt: 2}}>
                    <Typography variant="h6" color={requestStatusAssistantError}>
                        {requestStatusAssistant}
                    </Typography>
                </Container>
            )}
        </div>
    )
}