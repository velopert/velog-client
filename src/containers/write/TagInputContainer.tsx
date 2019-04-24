import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import TagInput from '../../components/write/TagInput';
import { changeTags } from '../../modules/write';

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export type TagInputContainerProps = OwnProps & StateProps & DispatchProps;

const mapStateToProps = (state: RootState) => ({
  tags: state.write.tags,
});
const mapDispatchToProps = {
  changeTags,
};

const TagInputContainer: React.FC<TagInputContainerProps> = ({
  tags,
  changeTags,
}) => {
  return <TagInput tags={tags} onChange={changeTags} />;
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(TagInputContainer);
