// import { useParams, useNavigate } from 'react-router-dom';
// import { Page, Card, Button, TextContainer, Text, Frame, Loading, Banner, Icon, Layout, Badge } from '@shopify/polaris';
// import { ChevronLeftMinor, ClockMajor, CalendarMajor, TypeMajor, StatusActiveMajor, InfoMinor, LinkMinor } from '@shopify/polaris-icons';
// import { useContests } from '../hooks/useContests';

// function ContestDetails() {
//   const { contestId } = useParams();
//   const navigate = useNavigate();
//   const { contests, loading, error } = useContests();

//   const contest = contests.find(c => c.id === parseInt(contestId));

//   if (loading) {
//     return (
//       <Frame>
//         <div className="loading-container">
//           <Loading />
//           <Text variant="headingLg" as="h2">Loading contest details...</Text>
//         </div>
//       </Frame>
//     );
//   }

//   if (error) {
//     return (
//       <Frame>
//         <Page title="Error">
//           <Banner status="critical">
//             <p>Failed to load contest details. Please try again later.</p>
//           </Banner>
//         </Page>
//       </Frame>
//     );
//   }

//   if (!contest) {
//     return (
//       <Frame>
//         <Page
//           breadcrumbs={[{ content: 'Back to contests', onAction: () => navigate('/') }]}
//           title="Contest not found"
//         >
//           <Banner status="warning">
//             <p>The requested contest could not be found.</p>
//           </Banner>
//         </Page>
//       </Frame>
//     );
//   }

//   const formatDate = (seconds) => {
//     return new Date(seconds * 1000).toLocaleString();
//   };

//   const getPhaseColor = (phase) => {
//     switch (phase) {
//       case 'FINISHED': return 'success';
//       case 'CODING': return 'attention';
//       case 'BEFORE': return 'info';
//       default: return 'new';
//     }
//   };

//   const getContestDescription = (contest) => {
//     const parts = [];
    
//     if (contest.type) {
//       parts.push(`This is a ${contest.type.toLowerCase()} contest`);
//     }
    
//     if (contest.phase === 'BEFORE') {
//       parts.push('The contest has not started yet');
//     } else if (contest.phase === 'CODING') {
//       parts.push('The contest is currently running');
//     } else if (contest.phase === 'FINISHED') {
//       parts.push('The contest has ended');
//     }
    
//     parts.push(`It will run for ${(contest.durationSeconds / 3600).toFixed(2)} hours`);
    
//     if (contest.startTimeSeconds) {
//       const startDate = new Date(contest.startTimeSeconds * 1000);
//       parts.push(`starting from ${startDate.toLocaleString()}`);
//     }
    
//     return parts.join('. ') + '.';
//   };

//   return (
//     <Frame>
//       <Page
//         breadcrumbs={[{
//           content: (
//             <Button plain icon={ChevronLeftMinor} onClick={() => navigate('/')}>
//               Back to contests
//             </Button>
//           )
//         }]}
//       >
//         <div className="contest-details-container">
//           <div className="contest-details-header">
//             <Badge status={getPhaseColor(contest.phase)} size="large">{contest.phase}</Badge>
//             <Text variant="heading2xl" as="h1">{contest.name}</Text>
//             <div className="contest-description">
//               <Text variant="bodyMd" as="p" color="subdued">
//                 {getContestDescription(contest)}
//               </Text>
//             </div>
//           </div>

//           <Layout>
//             <Layout.Section oneHalf>
//               <Card>
//                 <div className="contest-stats-grid">
//                   <div className="stat-item">
//                     <Icon source={TypeMajor} color="base" />
//                     <div>
//                       <Text variant="bodyMd" as="p" color="subdued">Contest Type</Text>
//                       <Text variant="headingLg" as="h3">{contest.type}</Text>
//                     </div>
//                   </div>

//                   <div className="stat-item">
//                     <Icon source={CalendarMajor} color="base" />
//                     <div>
//                       <Text variant="bodyMd" as="p" color="subdued">Start Time</Text>
//                       <Text variant="headingLg" as="h3">{formatDate(contest.startTimeSeconds)}</Text>
//                     </div>
//                   </div>

//                   <div className="stat-item">
//                     <Icon source={ClockMajor} color="base" />
//                     <div>
//                       <Text variant="bodyMd" as="p" color="subdued">Duration</Text>
//                       <Text variant="headingLg" as="h3">{(contest.durationSeconds / 3600).toFixed(2)} hours</Text>
//                     </div>
//                   </div>

//                   <div className="stat-item">
//                     <Icon source={StatusActiveMajor} color="base" />
//                     <div>
//                       <Text variant="bodyMd" as="p" color="subdued">Contest ID</Text>
//                       <Text variant="headingLg" as="h3">{contest.id}</Text>
//                     </div>
//                   </div>
//                 </div>
//               </Card>
//             </Layout.Section>

//             <Layout.Section oneHalf>
//               <Card>
//                 <div className="contest-info-section">
//                   <div className="section-header">
//                     <Icon source={InfoMinor} />
//                     <Text variant="headingMd" as="h3">Additional Information</Text>
//                   </div>
//                   <div className="info-content">
//                     <Text variant="bodyMd" as="p">
//                       {contest.description || 'No additional information available for this contest.'}
//                     </Text>
//                   </div>
//                 </div>
//               </Card>
//             </Layout.Section>
//           </Layout>
//         </div>
//       </Page>
//     </Frame>
//   );
// }

// export default ContestDetails; 