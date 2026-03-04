import logo from './logo.svg';
import './App.css';
import { Table } from 'react-bootstrap';


function App() {
  return (
    <div>
     <div className="bg-blue-500 text-white p-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John</td>
            <td>Doe</td>
            <td>@johndoe</td>
            <td><button onClick={() => alert("Button clicked!")} className="bg-red-300 text-white p-2 rounded">Edit</button></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jane</td>
            <td>Smith</td>
            <td>@janesmith</td>
            <td><button onClick={() => alert("Button clicked!")} className="bg-red-300 text-white p-2 rounded">Edit</button></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Bob</td>
            <td>Johnson</td>
            <td>@bobjohnson</td>
            <td><button onClick={() => alert("Button clicked!")} className="bg-red-300 text-white p-2 rounded">Edit</button></td>
          </tr>
        </tbody>
      </Table>

       

      </div>
    </div>
  );
}

export default App;
