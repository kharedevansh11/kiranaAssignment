import { useState, useEffect } from 'react';
import { Page, Layout, Card, Button, ButtonGroup, Text } from '@shopify/polaris';
import { StarFilledIcon, StarIcon, ChevronDownIcon, ChevronUpIcon } from '@shopify/polaris-icons';
import { useFavorites } from '../hooks/useFavorites';
import { fetchContests } from '../services/api';
import ContestList from '../components/ContestList/ContestList';
import SearchBar from '../components/Filters/SearchBar';
import TypeFilter from '../components/Filters/TypeFilter';
import ContestGraph from '../components/Visualization/ContestGraph';
import Pagination from '../components/Pagination/Pagination';

function Dashboard() {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const loadContests = async () => {
      try {
        const data = await fetchContests();
        setContests(data);
        setFilteredContests(data);
      } catch (error) {
        console.error('Error loading contests:', error);
      } finally {
        setLoading(false);
      }
    };
    loadContests();
  }, []);

  useEffect(() => {
    let filtered = contests;
    
    if (searchTerm) {
      filtered = filtered.filter(contest => 
        contest.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedType !== 'ALL') {
      filtered = filtered.filter(contest => contest.type === selectedType);
    }

    if (showFavorites) {
      filtered = filtered.filter(contest => isFavorite(contest.id));
    }
    
    setFilteredContests(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedType, contests, showFavorites, favorites]);

  const toggleFavoritesView = () => {
    setShowFavorites(!showFavorites);
  };

  const toggleGraph = () => {
    setShowGraph(!showGraph);
  };

  return (
    <Page>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <Text variant="heading2xl" as="h1" alignment="center">
            Codeforces Contest Dashboard
          </Text>
          <Text variant="bodySm" as="p" color="subdued" alignment="center">
            Track and manage your favorite programming contests
          </Text>
        </div>
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 300px' }}>
                  <SearchBar value={searchTerm} onChange={setSearchTerm} />
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <TypeFilter value={selectedType} onChange={setSelectedType} />
                </div>
                <div style={{ flex: '0 0 auto', alignSelf: 'flex-end' }}>
                  <Button
                    icon={showFavorites ? StarFilledIcon : StarIcon}
                    onClick={toggleFavoritesView}
                    pressed={showFavorites}
                    primary
                  >
                    {showFavorites ? 'Show All' : 'Show Favorites'}
                  </Button>
                </div>
              </div>
            </Card>
          </Layout.Section>
          
          <Layout.Section>
            <Card sectioned>
              <div className="graph-section">
                <Button
                  onClick={toggleGraph}
                  icon={showGraph ? ChevronUpIcon : ChevronDownIcon}
                  fullWidth
                  textAlign="left"
                >
                  {showGraph ? 'Hide Contest Duration Graph' : 'Show Contest Duration Graph'}
                </Button>
                
                <div className={`graph-container ${showGraph ? 'show' : ''}`}>
                  <ContestGraph contests={filteredContests} />
                </div>
              </div>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card sectioned>
              <ContestList 
               contests={filteredContests}
               currentPage={currentPage}
               itemsPerPage={itemsPerPage}
               isFavorite={isFavorite}
               onToggleFavorite={toggleFavorite}
              />
              <Pagination
                totalItems={filteredContests.length}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            </Card>
          </Layout.Section>
        </Layout>
      </div>
    </Page>
  );
}

export default Dashboard;
