import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  Stack,
} from "@chakra-ui/react";

export default function Page() {
  return (
    <div>
      {/* <Box>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <div>=</div>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
      </Box> */}
      <InputGroup>
        <Input variant="unstyled" placeholder="tets" />
        <div>=</div>
        <Input variant="unstyled" placeholder="hhhhhh" />
      </InputGroup>
      <Stack spacing={3}>
        <Input variant="outline" placeholder="Outline" />
        <Input variant="flushed" placeholder="Flushed" />
        <Input variant="unstyled" placeholder="Unstyled" />
        <Input variant="filled" placeholder="Filled" />
      </Stack>
      <Box>
        <FormControl>
          <FormLabel>接受地址</FormLabel>
          <Input type="gray" />
        </FormControl>
      </Box>
    </div>
  );
}
