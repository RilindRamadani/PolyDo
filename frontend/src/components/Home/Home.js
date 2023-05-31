import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { GET_LISTS } from "../../Apollo/Queries/List.Queries";
import { useQuery } from "@apollo/client";
const Home = () => {
  const getRandomColor = () => {
    const randomColor1 =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    const randomColor2 =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    return `linear-gradient(${randomColor1}, ${randomColor2})`;
  };
  const {
    loading: listsLoading,
    error: listsError,
    data: listsData,
  } = useQuery(GET_LISTS);

  const lists = listsData;

  if (listsLoading) {
    return <p>Loading lists...</p>;
  }

  if (listsError) {
    return <p>Error loading lists: {listsError.message}</p>;
  }

  return (
    <MDBContainer>
      <MDBRow>
        {lists.lists.map((list) => (
          <MDBCol key={list._id} size="4">
            <MDBCard style={{ marginBottom: "20px", marginTop: "20px" }}>
              <MDBCardBody>
                <h5 style={{ backgroundColor: "lightgray", padding: "5px" }}>
                  {list.name}
                </h5>
                <hr />
                <p>{list.description}</p>
                <div>
                  {list.tasks.map((task) => (
                    <div
                      key={task._id}
                      style={{
                        width: "100%",
                        height: "300px",
                        backgroundColor: getRandomColor(),
                        marginBottom: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "18px",
                          marginBottom: "10px",
                        }}
                      >
                        {task.title}
                      </span>
                      <span style={{ textAlign: "center" }}>
                        {task.description}
                      </span>
                    </div>
                  ))}
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
};
export default Home;
