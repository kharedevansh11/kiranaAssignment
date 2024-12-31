import { ResourceList, Text, Badge, Button } from '@shopify/polaris';
import { StarFilledIcon, StarIcon } from '@shopify/polaris-icons';
import { useNavigate } from 'react-router-dom';

function ContestList({ contests, currentPage, itemsPerPage, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContests = contests.slice(startIndex, startIndex + itemsPerPage);

  const getPhaseColor = (phase) => {
    switch (phase) {
      case 'FINISHED': return 'success';
      case 'CODING': return 'attention';
      case 'BEFORE': return 'info';
      default: return 'new';
    }
  };

  const formatDate = (seconds) => {
    return new Date(seconds * 1000).toLocaleDateString();
  };

  return (
    <div className="contest-list-container">
      <ResourceList
        items={paginatedContests}
        renderItem={(contest) => (
          <ResourceList.Item
            id={contest.id}
            onClick={() => navigate(`/contest/${contest.id}`)}
            className="contest-list-item"
          >
            <div className="contest-item-content">
              <div className="contest-main-info">
                <Text variant="headingMd" as="h3">
                  {contest.name}
                </Text>
                <div className="contest-details">
                  <Text variant="bodySm" color="subdued">
                    <span className="detail-label">Type:</span> {contest.type}
                  </Text>
                  <Text variant="bodySm" color="subdued">
                    <span className="detail-label">Start:</span> {formatDate(contest.startTimeSeconds)}
                  </Text>
                </div>
              </div>
              <div className="contest-actions">
                <Button
                  icon={isFavorite(contest.id) ? StarFilledIcon : StarIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(contest.id);
                  }}
                  plain
                  monochrome
                />
                <Badge status={getPhaseColor(contest.phase)}>
                  {contest.phase}
                </Badge>
              </div>
            </div>
          </ResourceList.Item>
        )}
      />
    </div>
  );
}

export default ContestList;
