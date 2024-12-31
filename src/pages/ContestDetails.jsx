import { useParams, useNavigate } from 'react-router-dom';
import { Page, Card, Button, TextContainer, Text } from '@shopify/polaris';
import { useContests } from '../hooks/useContests';

function ContestDetails() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const { contests, loading } = useContests();

  const contest = contests.find(c => c.id === parseInt(contestId));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!contest) {
    return <div>Contest not found</div>;
  }

  const formatDate = (seconds) => {
    return new Date(seconds * 1000).toLocaleString();
  };

  return (
    <Page
      breadcrumbs={[{ content: 'Back to contests', onAction: () => navigate('/') }]}
      title={contest.name}
    >
      <Card sectioned>
        <TextContainer>
          <Text variation="strong">Contest ID:</Text> {contest.id}
          <br />
          <Text variation="strong">Type:</Text> {contest.type}
          <br />
          <Text variation="strong">Phase:</Text> {contest.phase}
          <br />
          <Text variation="strong">Start Time:</Text> {formatDate(contest.startTimeSeconds)}
          <br />
          <Text variation="strong">Duration:</Text> {contest.durationSeconds / 3600} hours
        </TextContainer>
      </Card>
    </Page>
  );
}

export default ContestDetails;
