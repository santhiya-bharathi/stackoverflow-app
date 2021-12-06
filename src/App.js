
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useHistory } from "react-router-dom";
import {useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { Switch, Route,  useParams} from "react-router-dom";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';




export default function App() {
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  const history = useHistory();
  const [mode, setMode] = useState("dark");
const darkTheme = createTheme({
  palette: {
    mode: mode,
  },
});

const INITIAL_QUERY =[{
       qn:"Batch create scripts with line updated in each one based on a list",
       tag1:"html",
       tag2:"css",
       tag3:"javascript",
       answers:"I am looking to generate multiple script files with a line to a file path in each updated based on a list of file paths, with a new copy of the file generated once the file path is updated.For example, the below line (LOC_PATH) in each new script file needs to be the next in the list, which I have as a list in excel currently."
},
{
  qn:"How can I alter this computed column in SQL Server 2008?",
  tag1:"sql",
  tag2:"tsql",
  tag3:"sql-server",
  answers:"I have a computed column created with the following line: alter table tbPedidos add restricoes as (cast(case when restricaoLicenca = 1 or restricaoLote = 1 then 1 else 0 end as bit))"
},
{
  qn:"Skipping random lines when using pandas read_table",
  tag1:"python",
  tag2:"python-3x",
  tag3:"pandas",
  answers:"The pandas read_table() function enables us to read *.tab file and the parameter skiprow provides flexible ways to retrieve the data. However, I'm in trouble when I need to read *.tab file in a loop but the number of the rows need to skip is random. For example, the contents need to skip are started with /* and ended with */ , such as:/*... The number of rows need to skip is random...*/"
},
{
  qn:"how configure maven plugin repository",
  tag1:"maven",
  tag2:"plugin",
  tag3:"repository",
  answers:"I'm developing new Java project depending on third party library using maven 3.8.4 as build tool. I would add that library to my local maven repository with install:install-file option. When I execute the command, I get the error"
},
{
  qn:"WPF DataGridComboBox dynamic dropdown",
  tag1:"WPF",
  tag2:"DataGrid",
  tag3:"dynamic",
  answers:"Within a more complex DataGrid, I have a DataGridComboBoxColumn, a section of the XAML is: <DataGridComboBoxColumn x:Name=PrimaryProcessColumn"
}
]
const [querys, setQuerys] = useState(INITIAL_QUERY);
  return (
    <ThemeProvider theme={darkTheme}>
      <Paper elevation={3} style={{borderRadius:"0px",minHeight:"100vh"}}>
    <div className="App">
    <AppBar position="static">
       <Toolbar>
         <Button varient="text" color="inherit" onClick={()=>history.push("/")}>stack overflow</Button>
     
       <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
       <Button varient="text" color="inherit" style={{marginLeft:"auto"}} onClick={()=>setMode(mode==="light"? "dark":"light")}> {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />} {mode==="light"? "Dark":"Light"}Mode</Button>
       </Toolbar>
       </AppBar>

       <Switch>
      <Route exact path="/">
          <StackOverFlow querys={querys}/>
        </Route>

        <Route path="/askquestion/edit/:id">
          <GiveAnswer querys={querys} setQuerys={setQuerys}/>
        </Route>

        <Route path="/askquestion/:id">
          <AnswerPage querys={querys}/>
        </Route>

        <Route path="/askquestion">
          <AskQuestion querys={querys} setQuerys={setQuerys}/>
        </Route>

        </Switch>

    </div>
    </Paper>
    </ThemeProvider>
  );
}



function StackOverFlow({querys}){
  const history = useHistory();
  return (
    <div>
    <div className="home">
      <h2 className="">Top Questions</h2>
      <Button variant="outlined" color="inherit" onClick={()=>history.push("/askquestion")}>Ask Questions</Button>
    </div>
    <QueryList querys={querys}/>
   
    </div>
  );
}

function AskQuestion({querys, setQuerys}){
  const history = useHistory();
  const [qn, setQn] = useState("");
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [tag3, setTag3] = useState("");
  const [answers, setAnswers] = useState("");
  
const addQn =()=>{
  const newques= {qn, tag1, tag2, tag3,answers};
  setQuerys([...querys,newques]);
  history.push("/");
};
  return(
<div >
  <h2 className="head-qn">Ask a public question</h2>
  <TextareaAutosize
  className="text-area"
  value={qn} 
  onChange={(event)=>setQn(event.target.value)}
      aria-label="empty textarea"
      placeholder="Type your question" 
      style={{ width: 1000, height: 300 }}
    />
    <div class="ask-tag">
    <TextField value={tag1} 
      onChange={(event)=>setTag1(event.target.value)}  label="enter tag" variant="outlined" />
       <TextField value={tag2} 
      onChange={(event)=>setTag2(event.target.value)}  label="enter tag" variant="outlined" />
       <TextField value={tag3} 
      onChange={(event)=>setTag3(event.target.value)}  label="enter tag" variant="outlined" />

      </div>
      
      <TextareaAutosize
  className="text-area"
  value={answers} 
  onChange={(event)=>setAnswers(event.target.value)}
      aria-label="empty textarea"
      placeholder="Type your known answer" 
      style={{ width: 1000, height: 300 }}
    />
   
       <Button style={{ display:'flex', margin: 20}}variant="outlined" color="inherit" onClick={addQn}>Post Questions</Button>
</div>
  );
}

function QueryList({querys}){
  const history = useHistory();
  return(
    <section>
         {querys.map(({qn, tag1, tag2, tag3},index)=>(
       <QuestionPage qn={qn} tag1={tag1} tag2={tag2} tag3={tag3} id={index}
       editButton= {<IconButton 
        style={{marginLeft:"auto"}}
        aria-label="edit"  color="success"
       onClick={()=>history.push("/askquestion/edit/" + index)}>
       <EditIcon />
     </IconButton>}
       />
       ))}
       </section>
       );
     }

function QuestionPage({qn, tag1, tag2, tag3, id, editButton}){
  const history = useHistory();
  const [vote, setVote] = useState(1);
  return(
<div className="qn-tag">
  <div className="qn-tag-1">
    <div className="votes-views" style={{marginRight:"auto"}}>
      <div className="votes"  onClick={()=> setVote(vote+1)}>
      <p>{vote}</p>
      <p>votes</p>
      </div>
      <div  className="votes">
      <p>0</p>
      <p>answer</p>
      </div>
      <div  className="votes">
      <p>6</p>
      <p>views</p>
      </div>
         </div>
         <div style={{marginCenter:"auto"}}>
         <p className="para-qn-style">{qn}</p>
          <div className="tag-but">
         <Button variant="contained" color="primary" disabled>{tag1}</Button>
         <Button variant="contained" color="primary" disabled>{tag2}</Button>
         <Button variant="contained" color="primary" disabled>{tag3}</Button>
      </div>
    </div>
    <div style={{marginLeft:"auto"}}>
    <Button variant="contained" color="primary" onClick={()=>{console.log(id);
        history.push("/askquestion/"+id);
        }}>View Answer</Button>
         {editButton}
    </div> 
  </div>
</div>
  );
}

function AnswerPage({querys}){
  const history = useHistory();
  const {id} = useParams();
  const qndet = querys[id]; 
  console.log(qndet);
  return(
    <div>
    <p className="para-qn-style">{qndet.qn}</p>
    <p>ANSWER:   {qndet.answers}</p>
    <Button onClick={()=>history.push("/") }variant="outlined"><KeyboardBackspaceIcon/>Back</Button>
  </div>
  );
}

function GiveAnswer({querys, setQuerys}){
  const history = useHistory();
  const {id} = useParams();
  const qndet = querys[id]; 
  const [qn, setQn] = useState(qndet.qn);
  const [tag1, setTag1] = useState(qndet.tag1);
  const [tag2, setTag2] = useState(qndet.tag2);
  const [tag3, setTag3] = useState(qndet.tag3);
  const [answers, setAnswers] = useState(qndet.answers);

  const editAnswer =()=>{
    
    const updatedAnswer= {qn, tag1, tag2, tag3, answers};
    console.log(updatedAnswer);
    const copyAnswer =[...querys];
    copyAnswer[id] = updatedAnswer;
    setQuerys(copyAnswer);
    history.push("/");
  };

  return(
    <div>
     <TextareaAutosize
  className="text-area"
  value={qn} 
  onChange={(event)=>setQn(event.target.value)}
      aria-label="empty textarea"
      placeholder="Type your question" 
      style={{ width: 1500, height: 200 }}
    />
     <TextareaAutosize
  className="text-area"
  value={answers} 
  onChange={(event)=>setAnswers(event.target.value)}
      aria-label="empty textarea"
      placeholder="Type your known answer" 
      style={{ width: 1500, height: 300 }}
    />
    
     <div class="ask-tag">
    <TextField value={tag1} 
      onChange={(event)=>setTag1(event.target.value)}  label="enter tag" variant="outlined" />
       <TextField value={tag2} 
      onChange={(event)=>setTag2(event.target.value)}  label="enter tag" variant="outlined" />
       <TextField value={tag3} 
      onChange={(event)=>setTag3(event.target.value)}  label="enter tag" variant="outlined" />

      </div>
      <Button onClick={editAnswer} variant="contained">SaveAnswer</Button>
    </div>
  );
}
