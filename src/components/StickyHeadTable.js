import React, { Fragment }from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Link from "@material-ui/core/Link";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const columns = [
  { id: "name", label: "Name", minWidth: 200 },
  { 
    id: "url", 
    label: "URL", 
    minWidth: 300,
    format : value => (<Link href={value}>{value}</Link>)
  },
  {
    id: "stargazers",
    label: "Stars",
    minWidth: 50,
    align: "right",
    format: value => value.toLocaleString()
  },
  {
    id: "forks",
    label: "Forks",
    minWidth: 50,
    align: "right",
    format: value => value.toLocaleString()
  },
  {
    id: "watchers",
    label: "Watchers",
    minWidth: 50,
    align: "right",
    format: value => value.toLocaleString()
  },
  {
    id: "issues",
    label: "Issues",
    minWidth: 50,
    align: "right",
    format: value => value.toLocaleString()
  },
  {
    id: "pullRequests",
    label: "Pull Requests",
    minWidth: 50,
    align: "right",
    format: value => value.toLocaleString()
  },
  {
    id: "releases",
    label: "Releases",
    minWidth: 50,
    align: "right",
    format: value => value.toLocaleString()
  }
];

const GET_GITHUB_DATA = gql`
  query githubData($login: String!, $first: Int!) {
    organization(login: $login) {
      repositories(first: $first, privacy: PUBLIC) {
        totalCount
        nodes {
          id
          name
          url
          stargazers {
            totalCount
          }
          forks {
            totalCount
          }
          watchers {
            totalCount
          }
          issues {
            totalCount
          }
          pullRequests {
            totalCount
          }
          releases {
            totalCount
          }
        }
      }
    }
  }
`;

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  tableWrapper: {
    maxHeight: 750,
    overflow: "auto"
  }
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data, loading, error } = useQuery(GET_GITHUB_DATA, {
    variables: { login: "facebook", first: 50 }
  });
  const nodeCount =
    data &&
    data.organization &&
    data.organization.repositories &&
    data.organization.repositories.nodes
      ? data.organization.repositories.nodes.length
      : 0;

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  if (loading) return <CircularProgress />;
  if (error) return <Chip label={`ERROR: ${error.message}`} color="secondary" />;

  return (
    <Fragment>
      <Typography variant="h4" gutterBottom>
        Github Repos
      </Typography>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.organization &&
                data.organization.repositories &&
                data.organization.repositories.nodes &&
                data.organization.repositories.nodes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map(column => {
                          const value =
                            typeof row[column.id] === "object"
                              ? row[column.id]["totalCount"]
                              : row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format &&
                              (typeof value === "number" || column.id === "url")
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={nodeCount}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "previous page"
          }}
          nextIconButtonProps={{
            "aria-label": "next page"
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Fragment>
  );
}
