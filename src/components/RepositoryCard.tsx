import { Paper, Typography } from '@mui/material'
import { Repository } from '../pages/user/user.store'

interface UserCardProps {
  repository: Repository,
}

export default function RepositoryCard({ repository }: UserCardProps): JSX.Element {
  return (
    <Paper
      sx={{
        p: 1,
        height: '70px'
      }}
    >
      <Typography fontSize={14} sx={{marginBottom:'5px'}}>{
        repository.name.length > 20 ?
          repository.name.substring(0, 20) + '..'
        :
          repository.name
      }</Typography>
      {
        repository.stargazers_count > 0 ?
          <Typography fontSize={11} lineHeight={1.2}>{repository.stargazers_count} stars</Typography>
        : ''
      }
      {
        repository.forks_count > 0 ?
          <Typography fontSize={11} lineHeight={1.2}>{repository.forks_count} forks</Typography>
        : ''
      }
    </Paper>
  )
}