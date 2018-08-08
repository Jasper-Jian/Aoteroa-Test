import React from 'react';

import List from '@material-ui/core/List';
import ListItems from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
            <List component="nav">
              <ListItems button>
                <ListItemText>
                  {this.props.title}: {this.props.Detail}
                </ListItemText>
              </ListItems>
             <Divider />
           </List>
      </div>
    );
  }
}

export default ListItem;
